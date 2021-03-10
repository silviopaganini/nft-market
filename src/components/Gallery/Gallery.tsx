import { useCallback, useEffect } from 'react'
import { Box, Grid, Heading } from 'theme-ui'
import { updateUser } from '../../actions'
import { ActionType, useStateContext } from '../../state'
import Token, { TokenProps } from '../Token'

export type GalleryProps = {}

const Gallery = () => {
  const { state, dispatch } = useStateContext()
  const { web3, contract, user, tokensOnSale } = state

  const onConfirmTransfer = async () => {
    if (!user || !user.address || !web3) return
    await updateUser({ contract: contract?.payload, userAccount: user.address, state, dispatch })
  }

  const onBuyToken = async ({ id, price }: { id: string; price: string }) => {
    if (!contract?.payload) return

    try {
      contract.payload.methods
        .purchaseToken(id)
        .send({ from: user?.address, value: price })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', onConfirmTransfer)
        .on('confirmation', onConfirmTransfer)
        .on('error', console.error)

      // .on('transactionHash', function (hash: any) {
      //   console.log(hash)
      // })
      // .on('receipt', onConfirmTransfer)
      // .on('confirmation', onConfirmTransfer)
      // .on('error', console.error)
    } catch (e) {}
  }

  const loadTokensForSale = useCallback(async () => {
    try {
      const tokensForSale = (await contract?.payload.methods.getAllOnSale().call()).reduce(
        (acc: TokenProps[], b: any) => {
          if (b.id !== '0') {
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

  const onBuyTokenClick = ({ id, price }: { id: string; price: string }) => {
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
