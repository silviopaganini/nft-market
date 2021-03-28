import {
  useEffect,
  useState,
  // useCallback
} from 'react'
import {
  // Heading,
  Container,
  Grid,
  Button,
  Spinner,
} from 'theme-ui'
import useSWR from 'swr'

import { Gallery, MetamaskLogin } from '../components'
import { ActionType, useStateContext } from '../state'
import { getContract, updateUser } from '../actions'
import {
  // UnsupportedChainIdError,
  useWeb3React,
} from '@web3-react/core'

// import {
//   NoEthereumProviderError,
//   UserRejectedRequestError as UserRejectedRequestErrorInjected,
// } from '@web3-react/injected-connector'
// import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
// import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'

import { useEagerConnect, useInactiveListener } from '../hooks/web3'

import {
  injected,
  // network,
  walletconnect,
  // walletlink,
  // ledger,
  // trezor,
  // lattice,
  // frame,
  // authereum,
  // fortmatic,
  // magic,
  // portis,
  // torus,
} from '../connectors'
import { ETHSCAN_API } from '../utils'
import { fetcherETHUSD } from '../utils/fetchers'

enum ConnectorNames {
  Injected = 'Injected',
  // Network = 'Network',
  WalletConnect = 'WalletConnect',
  // WalletLink = 'WalletLink',
  // Ledger = 'Ledger',
  // Trezor = 'Trezor',
  // Lattice = 'Lattice',
  // Frame = 'Frame',
  // Authereum = 'Authereum',
  // Fortmatic = 'Fortmatic',
  // Magic = 'Magic',
  // Portis = 'Portis',
  // Torus = 'Torus',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  // [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  // [ConnectorNames.WalletLink]: walletlink,
  // [ConnectorNames.Ledger]: ledger,
  // [ConnectorNames.Trezor]: trezor,
  // [ConnectorNames.Lattice]: lattice,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Authereum]: authereum,
  // [ConnectorNames.Fortmatic]: fortmatic,
  // [ConnectorNames.Magic]: magic,
  // [ConnectorNames.Portis]: portis,
  // [ConnectorNames.Torus]: torus,
}

// function getErrorMessage(error: Error) {
//   if (error instanceof NoEthereumProviderError) {
//     return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
//   } else if (error instanceof UnsupportedChainIdError) {
//     return "You're connected to an unsupported network."
//   } else if (
//     error instanceof UserRejectedRequestErrorInjected ||
//     error instanceof UserRejectedRequestErrorWalletConnect ||
//     error instanceof UserRejectedRequestErrorFrame
//   ) {
//     return 'Please authorize this website to access your Ethereum account.'
//   } else {
//     console.error(error)
//     return 'An unknown error occurred. Check the console for more details.'
//   }
// }

const App = () => {
  const { dispatch, state } = useStateContext()
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    // deactivate,
    setError,
    error,
  } = useWeb3React()

  const { data: ethPrice } = useSWR(ETHSCAN_API, fetcherETHUSD)

  useEffect(() => {
    dispatch({ type: ActionType.ETH_PRICE, payload: ethPrice })
  }, [ethPrice, dispatch])

  const signInUser = async () => {
    if (!account) throw new Error('No Account found')
    if (!chainId) throw new Error('No chainId')
    try {
      await library.getSigner(account).signMessage('👋')
      const contract = await getContract({ dispatch, library, chainId })
      await updateUser({ contract, userAccount: account, library, dispatch })
    } catch (e) {
      setError(e)
    }
  }

  const [activatingConnector, setActivatingConnector] = useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <Container>
      {!state.user ? (
        <>
          <Grid gap="1rem" columns="1fr 1fr">
            {Object.keys(connectorsByName).map((name: string) => {
              //@ts-ignore
              const currentConnector = connectorsByName[name]
              const activating = currentConnector === activatingConnector
              const connected = currentConnector === connector
              const disabled = !triedEager || !!activatingConnector || connected || !!error

              return (
                <Button
                  mt={2}
                  variant="tertiary"
                  sx={{
                    borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                    position: 'relative',
                  }}
                  disabled={disabled}
                  key={name}
                  onClick={() => {
                    setActivatingConnector(currentConnector)
                    //@ts-ignore
                    activate(connectorsByName[name])
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'black',
                      margin: '0 0 0 1rem',
                    }}
                  >
                    {activating && <Spinner />}
                    {connected && (
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                    )}
                  </div>
                  {name}
                </Button>
              )
            })}
          </Grid>
          {!!(library && account) && connector === connectorsByName.Injected && (
            <MetamaskLogin onClickConnect={signInUser} />
          )}
        </>
      ) : (
        <Gallery />
      )}
    </Container>
  )
}

export default App
