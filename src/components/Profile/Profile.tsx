import { useWeb3React } from '@web3-react/core'
// import { useCallback, useEffect, useState } from 'react'
import { utils, BigNumber } from 'ethers'
import { Text, Box, Heading, Grid, Divider } from 'theme-ui'
import {
  Token,
  // ActivityLine
} from '..'
import { updateUser } from '../../actions'
import { useStateContext } from '../../state'
// import { ActivityHistory } from '../ActivityLine/ActivityLine'

export type ProfileProps = {}

const Profile = () => {
  const { state, dispatch } = useStateContext()
  const { contract, user, tokensOnSale } = state
  const { library } = useWeb3React()
  // const [history, setHistory] = useState<ActivityHistory[]>([])

  // TODO: build history again

  // const getHistory = useCallback(
  //   async (address: string, event: string) => {
  //     if (!contract?.payload || !library) return []

  //     try {
  //       const events = await await contract?.payload.getPastEvents(event, {
  //         fromBlock: 0,
  //         toBlock: 'latest',
  //         filter: {
  //           owner: address,
  //         },
  //       })

  //       return await Promise.all<ActivityHistory>(
  //         events.map(async (item: any) => {
  //           const timestamp = (await library.eth.getBlock(item.blockNumber)).timestamp
  //           const historyItem = {
  //             from: item.returnValues.from,
  //             to: item.returnValues.to,
  //             name: (await contract.payload.methods.tokenMeta(item.returnValues.tokenid).call())
  //               .name,
  //             time: new Date(Number(timestamp) * 1000),
  //           }
  //           return historyItem
  //         })
  //       )
  //     } catch (e) {
  //       console.log(e)
  //       return []
  //     }
  //   },
  //   [contract?.payload, library]
  // )

  // const getActivity = useCallback(
  //   async (address: string) => {
  //     if (!contract?.payload || !library) return
  //     try {
  //       const boughtFrom = await getHistory(address, 'Bought')
  //       const soldTo = await getHistory(address, 'Sold')

  //       const sortedHistory = [...boughtFrom, ...soldTo].sort(
  //         (a, b) => b.time.getTime() - a.time.getTime()
  //       )

  //       setHistory(sortedHistory)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   },
  //   [contract?.payload, library, getHistory]
  // )

  // useEffect(() => {
  //   if (!user || !contract) return
  //   getActivity(user.address)
  // }, [contract, user, getActivity])

  if (!user) return null

  const { address, balance, ownedTokens } = user

  const onConfirmTransfer = async (): Promise<boolean> => {
    if (!user || !user.address || !library) return false
    try {
      await updateUser({
        contract: contract?.payload,
        userAccount: user.address,
        library,
        dispatch,
      })
      return true
    } catch (e) {
      return false
    }
  }

  const onTransferToken = async ({
    id,
    address,
  }: {
    id: string
    address: string
  }): Promise<boolean> => {
    if (!contract?.payload) return false

    try {
      const tx = await contract.payload['safeTransferFrom(address,address,uint256)'](
        user.address,
        address,
        id,
        {
          from: user.address,
        }
      )
      const receipt = await tx.wait()
      if (receipt.confirmations >= 1) {
        return onConfirmTransfer()
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const onSaleToken = async ({
    id,
    price,
    onSale = true,
  }: {
    id: string
    price: BigNumber
    onSale?: boolean
  }): Promise<boolean> => {
    if (!contract?.payload || !user?.address) return false
    try {
      await contract.payload.setTokenSale(id, onSale, price)
      return await onConfirmTransfer()
    } catch (e) {
      console.log(e)
      return false
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
                  isOnSale={
                    !!tokensOnSale?.find(a => utils.formatUnits(a.id) === utils.formatUnits(t.id))
                  }
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
      {/* <Divider variant="divider.nft" sx={{ my: 7 }} />
      <Heading as="h2">Activity</Heading>
      {history.map((activity, index) => (
        <ActivityLine key={index} activity={activity} />
      ))} */}
    </Box>
  )
}

export default Profile
