import { Container } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import { Gallery, TransactionProgress, Login } from '../components'
import { useAppState } from '../state'

const App = () => {
  const { user } = useAppState()
  const { active } = useWeb3React()

  return (
    <Container>
      {!user && <Login />}

      {user && active && (
        <>
          <Gallery />
          <TransactionProgress />
        </>
      )}
    </Container>
  )
}

export default App
