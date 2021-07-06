import { utils } from 'ethers'
import { Text, Box, Heading, Grid, Divider } from 'theme-ui'
import { Token } from '../components'
import { useAppState } from '../state'

export type ProfileProps = {}

const Profile = () => {
  const { user, tokensOnSale } = useAppState()

  if (!user) return null

  const { address, balance, ownedTokens } = user

  return (
    <Box>
      <Heading as="h1">My Profile</Heading>
      <Grid columns={['1fr', '1fr 1fr']} sx={{ overflow: 'hidden', gap: '0 20px' }}>
        <Box>
          <Heading as="h4" sx={{ color: 'green' }}>
            Address
          </Heading>
          <Text>{address}</Text>
        </Box>
        <Box>
          <Heading as="h4" sx={{ color: 'green' }}>
            Balance
          </Heading>
          <Text>Ξ {balance}</Text>
        </Box>
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
            <Grid gap={4} columns={['1fr 1fr', '1fr 1fr 1fr']}>
              {ownedTokens.map((t, index) => (
                <Token
                  isOnSale={
                    !!tokensOnSale?.find(a => utils.formatUnits(a.id) === utils.formatUnits(t.id))
                  }
                  onSale
                  onTransfer
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
    </Box>
  )
}

export { Profile }
