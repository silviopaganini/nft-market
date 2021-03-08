import { useState } from 'react'
import { Heading, Container, Divider } from 'theme-ui'
import { Gallery, MetamaskLogin, Profile } from '../components'
import { useStateContext } from '../state'
import { getContract, signUser, updateUser } from '../actions'

// TODO: Show event of token sold

const App = () => {
  const { state, dispatch } = useStateContext()
  const { web3, user } = state
  const [error, setError] = useState<boolean>(false)

  const onClickConnect = async () => {
    if (!state || !web3) return
    try {
      const [userAccount] = await web3.eth.getAccounts()

      const contract = await getContract({ state, dispatch })

      await signUser(userAccount)

      await updateUser({ contract, userAccount, state, dispatch })
    } catch (e) {
      setError(true)
      console.log(e)
    }
  }

  return (
    <>
      <Container>
        {error ? (
          <Heading as="h3">Please connect to Metamask.</Heading>
        ) : (
          <>
            {!user || !user.address ? (
              <MetamaskLogin onClickConnect={onClickConnect} />
            ) : (
              <>
                <Gallery />
                <Divider />
                <Profile />
              </>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default App
