import { BigNumber, utils } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading } from 'theme-ui'
import { useAppState } from '../../state'
import { Token } from '..'

export type GalleryProps = {}
type StateOrder = 'price' | 'alpha'

const Gallery = () => {
  const { user, tokensOnSale } = useAppState()
  const updateTokensOnSale = useAppState(
    useCallback(({ updateTokensOnSale }) => updateTokensOnSale, [])
  )

  const [order, setOrder] = useState<StateOrder>('alpha')

  useEffect(() => {
    updateTokensOnSale()
  }, [updateTokensOnSale])

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
            <Token onBuy={!user?.ownedTokens.find(t => t.id === i.id)} token={i} key={index} />
          ))}
      </Grid>
    </Box>
  )
}

export { Gallery }
