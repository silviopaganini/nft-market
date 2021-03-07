import { useEffect, useState } from 'react'
import { App, Error } from './'
import { Header } from '../components'
import { ActionType, useStateContext } from '../state'
import getWeb3 from '../utils/web3'

const Root = () => {
  const {
    state: { web3 },
    dispatch,
  } = useStateContext()

  const [error, setError] = useState(false)

  useEffect(() => {
    const onAccountsChanged = () => {
      window.location.reload()
    }

    const startWeb3 = async () => {
      try {
        const web3 = await getWeb3()
        window.ethereum.on('accountsChanged', onAccountsChanged)
        dispatch({ type: ActionType.WEB3_INIT, payload: web3 })
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }

    startWeb3()
  }, [dispatch])

  return (
    <>
      <Header />
      {web3 && <App />}
      {error && <Error />}
    </>
  )
}

export default Root
