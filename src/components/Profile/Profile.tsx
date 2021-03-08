import { useCallback, useEffect, useState } from 'react'
import { Text, Box, Heading, Grid, Divider } from 'theme-ui'
import { Token } from '..'
import { updateUser } from '../../actions'
import { useStateContext } from '../../state'
import { toWei } from '../../utils'

export type ProfileProps = {}

type History = {
  owner?: string
  tokenId: string
  to?: string
  from?: string
  time: Date
}

const Profile = () => {
  const { state, dispatch } = useStateContext()
  const { web3, contract, user, tokensOnSale } = state
  const [history, setHistory] = useState<History[]>([])

  const getActivity = useCallback(
    async (address: string) => {
      if (!contract?.payload || !web3) return
      try {
        const boughtFrom = await Promise.all<History>(
          await (
            await contract?.payload.getPastEvents('Bought', {
              fromBlock: 0,
              toBlock: 'latest',
              filter: {
                owner: address,
              },
            })
          ).reduce(async (acc: History[], item: any) => {
            const historyItem = {
              from: item.returnValues.from,
              tokenId: await contract.payload.methods.tokenURI(item.returnValues.tokenid).call(),
              time: new Date(Number((await web3?.eth.getBlock(item.blockNumber)).timestamp) * 1000),
            }
            acc.push(historyItem)
            return acc
          }, [] as History[])
        )

        const soldTo = await Promise.all<History>(
          await (
            await contract?.payload.getPastEvents('Sold', {
              fromBlock: 0,
              toBlock: 'latest',
              filter: {
                owner: address,
              },
            })
          ).reduce(async (acc: History[], item: any) => {
            const historyItem = {
              to: item.returnValues.to,
              tokenId: await contract.payload.methods.tokenURI(item.returnValues.tokenid).call(),
              time: new Date(Number((await web3?.eth.getBlock(item.blockNumber)).timestamp) * 1000),
            }
            acc.push(historyItem)
            return acc
          }, [] as History[])
        )

        const sortedHistory = [...boughtFrom, ...soldTo].sort(
          (a, b) => b.time.getTime() - a.time.getTime()
        )

        setHistory(sortedHistory)
      } catch (e) {
        console.log(e)
      }
    },
    [contract?.payload, web3]
  )

  useEffect(() => {
    if (!user || !contract) return
    getActivity(user.address)
  }, [contract, user, getActivity])

  if (!user) return null

  const { address, balance, ownedTokens } = user

  const onConfirmTransfer = async () => {
    if (!user || !user.address || !web3) return
    await updateUser({ contract: contract?.payload, userAccount: user.address, state, dispatch })
  }

  const onTransferToken = ({ id, address }: { id: string; address: string }) => {
    if (!contract?.payload) return

    try {
      contract?.payload.methods
        .safeTransferFrom(user?.address, address, id)
        .send({ from: user?.address })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', onConfirmTransfer)
        .on('confirmation', onConfirmTransfer)
        .on('error', console.error)
    } catch (e) {
      console.log(e)
    }
  }

  const onSaleToken = async ({
    id,
    price,
    onSale = true,
  }: {
    id: string
    price: string
    onSale?: boolean
  }) => {
    if (!contract?.payload || !user?.address) return
    try {
      await contract.payload.methods
        .setTokenSale(id, onSale, toWei(price))
        .send({ from: user.address })

      onConfirmTransfer()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Heading as="h1">My Profile</Heading>
      <Grid columns="1fr 1fr" sx={{ gap: '10px 20px' }}>
        <Heading as="h2">Address</Heading>
        <Heading as="h2">Balance</Heading>
        <Text>{address}</Text>
        <Text>Ξ {balance}</Text>
      </Grid>

      <Box my={5}>
        {ownedTokens && ownedTokens.length > 0 ? (
          <Box>
            <Heading as="h2">
              Tokens owned{' '}
              <Text variant="text.body" as="span">
                ({ownedTokens.length} item)
              </Text>
            </Heading>
            <Grid gap={4} columns="1fr 1fr 1fr">
              {ownedTokens.map((t, index) => (
                <Token
                  isOnSale={!!tokensOnSale?.find(a => a.id === t.id)}
                  onSale={onSaleToken}
                  onTransfer={onTransferToken}
                  token={t}
                  key={index}
                />
              ))}
            </Grid>
          </Box>
        ) : (
          ownedTokens && (
            <Box>
              <Heading as="h2">You don't own any NFT tokens</Heading>
            </Box>
          )
        )}
      </Box>
      <Divider variant="divider.nft" />
      <Heading as="h2">Activity</Heading>
      {history.map((h, index) => (
        <Box
          key={index}
          sx={{ py: 3, px: 2, borderBottom: '1px solid', borderBottomColor: 'lightGray' }}
        >
          {h.from && (
            <Text>
              <Text as="span" sx={{ fontWeight: 'bold', color: 'green' }}>
                {'>'}
              </Text>
              <Text as="span" ml={2}>
                Bought <b>{h.tokenId}</b> from <b>{h.from}</b> at{' '}
                {h.time.toLocaleDateString('en-GB')} - {h.time.toLocaleTimeString('en-GB')}
              </Text>
            </Text>
          )}
          {h.to && (
            <Text>
              <Text as="span" sx={{ fontWeight: 'bold', color: 'amber' }}>
                {'<'}
              </Text>
              <Text as="span" ml={2}>
                Sold <b>{h.tokenId}</b> to <b>{h.to}</b> at {h.time.toLocaleDateString('en-GB')} -{' '}
                {h.time.toLocaleTimeString('en-GB')}
              </Text>
            </Text>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Profile
