import { useEffect, useState, useCallback } from 'react'
import { Heading, Container } from 'theme-ui'
import { Gallery, MetamaskLogin } from '../components'
import { ActionType, useStateContext } from '../state'
import { getContract, signUser, updateUser } from '../actions'

const { REACT_APP_APIETHERSCAN } = process.env

const App = () => {
  const { state, dispatch } = useStateContext()
  const { web3, user } = state
  const [error, setError] = useState<string>()

  const onClickConnect = useCallback(async () => {
    if (!state || !web3) return
    try {
      let [userAccount] = await web3.eth.requestAccounts()

      const {
        result: { ethusd },
      } = await (
        await fetch(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${REACT_APP_APIETHERSCAN}`
        )
      ).json()

      dispatch({ type: ActionType.ETH_PRICE, payload: ethusd })

      const contract = await getContract({ state, dispatch })
      console.log('sign user')

      await signUser(userAccount)

      await updateUser({ contract, userAccount, state, dispatch })
    } catch (e) {
      setError(e.message)
      console.log(e)
    }
  }, [dispatch, state, web3])

  useEffect(() => {
    const onChangeAccounts = (event: any) => {
      console.log(event)

      dispatch({
        type: ActionType.SIGN_OUT,
      })

      if (event.length < 1) {
        setError('You locked your Metamask, please unlock it and login again')
        return
      }

      setError(undefined)
    }

    const onChangeChain = () => {
      setError(undefined)
      onClickConnect()
    }

    window.ethereum.on('accountsChanged', onChangeAccounts)
    window.ethereum.on('chainChanged', onChangeChain)

    return () => {
      window.ethereum.removeAllListeners()
    }
  }, [onClickConnect, dispatch])

  return (
    <Container>
      {error ? (
        <>
          <Heading as="h3">{error}</Heading>
          <MetamaskLogin onClickConnect={onClickConnect} />
        </>
      ) : (
        <>
          {!user || !user.address ? (
            <>
              <Heading as="h3" sx={{ textAlign: 'center' }}>
                Before we start, we need to connect to you Metamask account{' '}
              </Heading>
              <MetamaskLogin onClickConnect={onClickConnect} />
            </>
          ) : (
            <>
              <Gallery />
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default App
