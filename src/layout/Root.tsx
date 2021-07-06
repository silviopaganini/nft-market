import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { Marketplace, Profile, Connect } from './'
import { Header, PrivateRoute, TransactionProgress } from '../components'
import { Container } from 'theme-ui'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const Root = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Connect>
          <Container>
            <Switch>
              <PrivateRoute path="/profile" component={Profile} />
              <Route exact path="/" component={Marketplace} />
            </Switch>
            <TransactionProgress />
          </Container>
        </Connect>
      </Web3ReactProvider>
    </Router>
  )
}

export { Root }
