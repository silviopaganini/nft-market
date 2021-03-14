import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { App, Profile } from './'
import { Header } from '../components'
import { PrivateRoute } from '../components/PrivateRoute'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const Root = () => {
  return (
    <Router>
      <Header />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Switch>
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Web3ReactProvider>
    </Router>
  )
}

export default Root
