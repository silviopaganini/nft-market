import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from '../connectors'
import { ActionType, useStateContext } from '../state'

export function useEagerConnect() {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [activate])

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate, deactivate } = useWeb3React()
  const { dispatch } = useStateContext()

  useEffect(() => {
    const { ethereum } = window as any

    if (ethereum && ethereum.on && active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(injected)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("111111 Handling 'chainChanged' event with payload", chainId)
        deactivate()
        dispatch({ type: ActionType.SIGN_OUT })
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("222222 Handling 'accountsChanged' event with payload", accounts)
        dispatch({ type: ActionType.SIGN_OUT })
        if (accounts.length > 0) {
          deactivate()
        }
      }

      ethereum.addListener('connect', handleConnect)
      ethereum.addListener('chainChanged', handleChainChanged)
      ethereum.addListener('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
  }, [active, error, suppress, activate, deactivate, dispatch])
}
