import { useCallback, useEffect, useState } from 'react'
import { Text, Box, Heading, Grid, Divider } from 'theme-ui'
import { Token, ActivityLine } from '..'
import { updateUser } from '../../actions'
import { useStateContext } from '../../state'
import { toWei } from '../../utils'
import { ActivityHistory } from '../ActivityLine/ActivityLine'

export type ProfileProps = {}

const Profile = () => {
  const { state, dispatch } = useStateContext()
  const { web3, contract, user, tokensOnSale } = state
  const [history, setHistory] = useState<ActivityHistory[]>([])

  const getHistory = useCallback(
    async (address: string, event: string) => {
      if (!contract?.payload || !web3) return []

      try {
        const events = await await contract?.payload.getPastEvents(event, {
          fromBlock: 0,
          toBlock: 'latest',
          filter: {
            owner: address,
          },
        })

        return await Promise.all<ActivityHistory>(
          events.map(async (item: any) => {
            const timestamp = (await web3.eth.getBlock(item.blockNumber)).timestamp
            const historyItem = {
              from: item.returnValues.from,
              to: item.returnValues.to,
              tokenId: await contract.payload.methods.tokenURI(item.returnValues.tokenid).call(),
              time: new Date(Number(timestamp) * 1000),
            }
            return historyItem
          })
        )
      } catch (e) {
        console.log(e)
        return []
      }
    },
    [contract?.payload, web3]
  )

  const getActivity = useCallback(
    async (address: string) => {
      if (!contract?.payload || !web3) return
      try {
        const boughtFrom = await getHistory(address, 'Bought')
        const soldTo = await getHistory(address, 'Sold')

        const sortedHistory = [...boughtFrom, ...soldTo].sort(
          (a, b) => b.time.getTime() - a.time.getTime()
        )

        setHistory(sortedHistory)
      } catch (e) {
        console.log(e)
      }
    },
    [contract?.payload, web3, getHistory]
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
      <Grid columns="1fr 1fr" sx={{ gap: '0 20px' }}>
        <Heading as="h4" sx={{ color: 'green' }}>
          Address
        </Heading>
        <Heading as="h4" sx={{ color: 'green' }}>
          Balance
        </Heading>
        <Text>{address}</Text>
        <Text>Ξ {balance}</Text>
      </Grid>
      <Divider variant="divider.nft" sx={{ my: 7 }} />
      <Box my={5}>
        {ownedTokens && ownedTokens.length > 0 ? (
          <Box>
            <Heading as="h2">
              My items{' '}
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
      <Divider variant="divider.nft" sx={{ my: 7 }} />
      <Heading as="h2">Activity</Heading>
      {history.map((activity, index) => (
        <ActivityLine key={index} activity={activity} />
      ))}
    </Box>
  )
}

export default Profile
