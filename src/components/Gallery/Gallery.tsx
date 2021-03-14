import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useCallback, useEffect } from 'react'
import { Box, Grid, Heading } from 'theme-ui'
import { updateUser } from '../../actions'
import { ActionType, useStateContext } from '../../state'
import Token, { TokenProps } from '../Token'

export type GalleryProps = {}

const Gallery = () => {
  const { state, dispatch } = useStateContext()
  const { library } = useWeb3React()
  const { contract, user, tokensOnSale } = state

  const onConfirmTransfer = async () => {
    if (!user || !user.address) return
    await updateUser({ contract: contract?.payload, userAccount: user.address, library, dispatch })
  }

  const onBuyToken = async ({ id, price }: { id: string; price: BigNumber }) => {
    if (!contract?.payload) return

    try {
      const tx = await contract.payload.purchaseToken(id, { value: price })
      const receipt = await tx.wait()
      if (receipt.confirmations >= 1) {
        onConfirmTransfer()
      } else {
        throw new Error(receipt)
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  const loadTokensForSale = useCallback(async () => {
    try {
      const tokensForSale = (await contract?.payload.getAllOnSale()).reduce(
        (acc: TokenProps[], b: any) => {
          if (b.uri !== '') {
            acc.push({ id: b.id, price: b.price, name: b.name, uri: b.uri })
          }

          return acc
        },
        [] as TokenProps[]
      )

      dispatch({ type: ActionType.LOAD_TOKEN_SALE, payload: tokensForSale })
    } catch (e) {
      console.log(e)
    }
  }, [dispatch, contract])

  const onBuyTokenClick = ({ id, price }: { id: string; price: BigNumber }) => {
    onBuyToken && onBuyToken({ id, price })
  }

  useEffect(() => {
    loadTokensForSale()
  }, [loadTokensForSale, user?.ownedTokens])

  return (
    <Box>
      <Heading as="h1">Market</Heading>
      <Grid gap={4} columns="1fr 1fr 1fr 1fr">
        {tokensOnSale?.map((i, index) => (
          <Token onBuy={onBuyTokenClick} token={i} key={index} />
        ))}
      </Grid>
    </Box>
  )
}

export default Gallery
