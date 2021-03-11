import { useState } from 'react'
import { Heading, Container } from 'theme-ui'
import { Gallery, MetamaskLogin } from '../components'
import { ActionType, useStateContext } from '../state'
import { getContract, signUser, updateUser } from '../actions'

const { REACT_APP_APIETHERSCAN } = process.env

const App = () => {
  const { state, dispatch } = useStateContext()
  const { web3, user } = state
  const [error, setError] = useState<boolean>(false)

  const onClickConnect = async () => {
    if (!state || !web3) return
    try {
      await window.ethereum.enable()
      const [userAccount] = await web3.eth.getAccounts()

      const {
        result: { ethusd },
      } = await (
        await fetch(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${REACT_APP_APIETHERSCAN}`
        )
      ).json()
      dispatch({ type: ActionType.ETH_PRICE, payload: ethusd })

      const contract = await getContract({ state, dispatch })
      await signUser(userAccount)

      await updateUser({ contract, userAccount, state, dispatch })
    } catch (e) {
      setError(true)
      console.log(e)
    }
  }

  return (
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
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default App
