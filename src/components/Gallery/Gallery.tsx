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
      <Heading as="h1">National Treasures</Heading>
      <Grid gap={4} columns={['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}>
        <Token
          onBuy={true}
          token={{ id: '1', uri: '/', price: BigNumber.from('2000000000000000000'), name: 'test' }}
          key={1}
        />
        {/*        <Token onBuy={true} token={{id: "2", uri: "/", price: BigNumber.from(100), name: "test"}} key={2} />
        <Token onBuy={true} token={{id: "3", uri: "/", price: BigNumber.from(100), name: "test"}} key={3} />
        <Token onBuy={true} token={{id: "4", uri: "/", price: BigNumber.from(100), name: "test"}} key={4} />
        <Token onBuy={true} token={{id: "5", uri: "/", price: BigNumber.from(100), name: "test"}} key={5} />
        <Token onBuy={true} token={{id: "6", uri: "/", price: BigNumber.from(100), name: "test"}} key={6} />
        <Token onBuy={true} token={{id: "7", uri: "/", price: BigNumber.from(100), name: "test"}} key={7} />
        <Token onBuy={true} token={{id: "8", uri: "/", price: BigNumber.from(100), name: "test"}} key={8} />
        <Token onBuy={true} token={{id: "9", uri: "/", price: BigNumber.from(100), name: "test"}} key={9} />
*/}

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
