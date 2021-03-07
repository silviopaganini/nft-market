import { Text, Box, Heading, Grid } from 'theme-ui'
import { Token } from '..'
import { useStateContext } from '../../state'

export type ProfileProps = {
  onTransferToken({ id, address }: { id: string; address: string }): void
  onSaleToken({ id, price, onSale }: { id: string; price: string; onSale?: boolean }): void
}

const Profile = ({ onSaleToken, onTransferToken }: ProfileProps) => {
  const {
    state: { user, tokensOnSale },
  } = useStateContext()

  if (!user) return null

  const { address, balance, ownedTokens } = user

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
            <Grid gap={1} columns="1fr 1fr">
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
    </Box>
  )
}

export default Profile
