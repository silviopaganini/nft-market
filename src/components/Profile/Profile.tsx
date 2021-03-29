import { useWeb3React } from '@web3-react/core'
import { utils, BigNumber } from 'ethers'
import { Text, Box, Heading, Grid, Divider } from 'theme-ui'
import { Token } from '..'
import { updateTokensOnSale, updateUser } from '../../actions'
import { useStateContext } from '../../state'

export type ProfileProps = {}

const Profile = () => {
  const { state, dispatch } = useStateContext()
  const { contract, user, tokensOnSale } = state
  const { library } = useWeb3React()

  if (!user) return null

  console.log(tokensOnSale)

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
      await updateTokensOnSale({ dispatch, contract: contract?.payload })
      return await onConfirmTransfer()
    } catch (e) {
      console.log(e)
      return false
    }
  }

  console.log(tokensOnSale)

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
    </Box>
  )
}

export default Profile
