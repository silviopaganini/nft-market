import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useCallback, useEffect } from 'react'
import { Box, Grid, Heading } from 'theme-ui'
import { updateTokensOnSale, updateUser } from '../../actions'
import { useStateContext } from '../../state'
import { Token } from '..'

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
      <Heading as="h1">Market</Heading>
      <Grid gap={4} columns={['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}>
        {tokensOnSale?.map((i, index) => (
          <Token onBuy={onBuyTokenClick} token={i} key={index} />
        ))}
      </Grid>
    </Box>
  )
}

export default Gallery
