import React, { useCallback, useEffect } from 'react'
import { Box, Grid, Heading } from 'theme-ui'
import { ActionType, useStateContext } from '../../state'
import Token, { TokenProps } from '../Token'

export type GalleryProps = {
  onBuyToken?({ id, price }: { id: string; price: string }): void
}

const Gallery = ({ onBuyToken }: GalleryProps) => {
  const {
    state: { contract, user, tokensOnSale },
    dispatch,
  } = useStateContext()

  const loadTokensForSale = useCallback(async () => {
    try {
      const tokensForSale = (await contract?.payload.methods.getAllOnSale().call()).reduce(
        (acc: TokenProps[], b: any) => {
          if (b.id !== '0') {
            acc.push({ id: b.id, price: b.price, uri: b.uri })
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
