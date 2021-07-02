import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'

import { FC, useEffect } from 'react'
import { Text, Container, Heading } from 'theme-ui'
import useSWR from 'swr'
import { getContract, updateUser } from '../actions'
import { useEagerConnect, useInactiveListener } from '../hooks/web3'
import { ActionType, useStateContext } from '../state'
import { ETHSCAN_API } from '../utils'
import { fetcherETHUSD } from '../utils/fetchers'

function getErrorMessage(error: Error) {
  console.log(error)

  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

const Connect: FC = ({ children }) => {
  const {
    dispatch,
    state: { activatingConnector },
  } = useStateContext()
  const { library, chainId, account, error } = useWeb3React()

  const { data: ethPrice } = useSWR(ETHSCAN_API, fetcherETHUSD)

  useEffect(() => {
    dispatch({ type: ActionType.ETH_PRICE, payload: ethPrice })
  }, [ethPrice, dispatch])

  useEffect(() => {
    if (!chainId || !account || !library) return

    const update = async () => {
      try {
        const contract = await getContract({ dispatch, library, chainId })
        await updateUser({ contract, userAccount: account, library, dispatch })
      } catch (e) {
        console.log(e)
      }
    }

    update()
  }, [chainId, account, library, dispatch])

  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <>
      {error ? (
        <Container>
          <Heading as="h2">❌ Something is not right</Heading>
          <Text sx={{ mt: 3 }}>{getErrorMessage(error)}</Text>
        </Container>
      ) : (
        children
      )}
    </>
  )
}

export default Connect
