import { BigNumber, utils } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading } from 'theme-ui'
import { updateTokensOnSale } from '../../actions'
import { ActionType, useStateContext } from '../../state'
import { Token } from '..'

export type GalleryProps = {}
type StateOrder = 'price' | 'alpha'

const Gallery = () => {
  const { state, dispatch } = useStateContext()
  const { contract, user, tokensOnSale } = state
  const [order, setOrder] = useState<StateOrder>('alpha')

  const onBuyToken = async ({ id, price }: { id: string; price: BigNumber }) => {
    if (!contract?.payload) return

    try {
      const tx = await contract.payload.purchaseToken(id, { value: price })
      dispatch({ type: ActionType.SET_TRANSACTION, payload: tx })
    } catch (e) {
      console.error(e)
    }
  }

  const loadTokensForSale = useCallback(async () => {
    if (!dispatch || !contract?.payload) return

    updateTokensOnSale({ dispatch, contract: contract.payload })
  }, [dispatch, contract])

  const onBuyTokenClick = ({ id, price }: { id: string; price: BigNumber }) => {
    onBuyToken && onBuyToken({ id, price })
  }

  useEffect(() => {
    loadTokensForSale()
  }, [loadTokensForSale, user?.ownedTokens])

  return (
    <Box>
      <Heading as="h1">Marketplace</Heading>
      <Flex sx={{ alignItems: 'center' }} mb={3}>
        <Heading as="h3" sx={{ color: 'lightGray' }}>
          Order:
        </Heading>
        <Flex ml={3}>
          <Button
            mr={2}
            onClick={() => setOrder('alpha')}
            variant="filter"
            disabled={order === 'alpha'}
          >
            Alphabetically
          </Button>
          <Button onClick={() => setOrder('price')} variant="filter" disabled={order === 'price'}>
            Price
          </Button>
        </Flex>
      </Flex>
      <Grid gap={4} columns={['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}>
        {tokensOnSale
          ?.sort((a, b) =>
            order === 'alpha'
              ? BigNumber.from(a.id)
                  .toString()
                  .localeCompare(BigNumber.from(b.id).toString(), undefined, { numeric: true })
              : Number(utils.formatEther(a.price.sub(b.price)))
          )
          .map((i, index) => (
            <Token onBuy={onBuyTokenClick} token={i} key={index} />
          ))}
      </Grid>
    </Box>
  )
}

export default Gallery
