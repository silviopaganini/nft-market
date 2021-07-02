import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from '../connectors'
// import { URI_AVAILABLE } from '@web3-react/walletconnect-connector'

export function useEagerConnect() {
  const { activate, active, connector } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    // console.log(connector)

    // if (connector === walletconnect) {
    //   walletconnect.on(URI_AVAILABLE, uri => {
    //     console.log(uri)
    //   })
    // }

    if (connector === injected) {
      injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      })
    }
  }, [activate, connector])

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

// type OnChangeProps = {
//   account?: string
//   chainId?: string | number
// }

export function useInactiveListener(suppress: boolean = false) {
  const { active, error } = useWeb3React()

  useEffect(() => {
    const { ethereum } = window as any

    if (ethereum) ethereum.autoRefreshOnNetworkChange = true

    // if (ethereum && ethereum.on && !active && !error && !suppress) {
    //   const handleConnect = () => {
    //     console.log("!!!!! Handling 'connect' event")
    //     activate(injected)
    //   }
    //   const handleChainChanged = (chainId: string | number) => {
    //     console.log("11111 Handling 'chainChanged' event with payload", chainId)
    //     activate(injected)
    //   }
    //   const handleAccountsChanged = (accounts: string[]) => {
    //     console.log("11111 Handling 'accountsChanged' event with payload", accounts)
    //     if (accounts.length > 0) {
    //       activate(injected)
    //     }
    //   }
    //   const handleNetworkChanged = (networkId: string | number) => {
    //     console.log("11111 Handling 'networkChanged' event with payload", networkId)
    //     activate(injected)
    //   }

    //   ethereum.on('connect', handleConnect)
    //   ethereum.on('chainChanged', handleChainChanged)
    //   ethereum.on('accountsChanged', handleAccountsChanged)
    //   ethereum.on('networkChanged', handleNetworkChanged)

    //   return () => {
    //     if (ethereum.removeListener) {
    //       ethereum.removeListener('connect', handleConnect)
    //       ethereum.removeListener('chainChanged', handleChainChanged)
    //       ethereum.removeListener('accountsChanged', handleAccountsChanged)
    //       ethereum.removeListener('networkChanged', handleNetworkChanged)
    //     }
    //   }
    // }
  }, [active, error, suppress])
}
