import { Text, Box, Heading, Grid } from 'theme-ui'
import { Token } from '..'
import { updateUser } from '../../actions'
import { useStateContext } from '../../state'
import { toWei } from '../../utils'

export type ProfileProps = {}

const Profile = () => {
  const { state, dispatch } = useStateContext()
  const { web3, contract, user, tokensOnSale } = state

  if (!user) return null

  const { address, balance, ownedTokens } = user

  const onConfirmTransfer = async () => {
    if (!user || !user.address || !web3) return
    await updateUser({ contract, userAccount: user.address, state, dispatch })
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
    </Box>
  )
}

export default Profile
