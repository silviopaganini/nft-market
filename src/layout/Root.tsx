import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { App, Error, Profile } from './'
import { Header } from '../components'
import { ActionType, useStateContext } from '../state'
import getWeb3 from '../utils/web3'
import { PrivateRoute } from '../components/PrivateRoute'

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
    <Router>
      <Header />
      {web3 && (
        <Switch>
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/">
            <App />
          </Route>
        </Switch>
      )}
      {error && <Error />}
    </Router>
  )
}

export default Root
