import { Container, Grid, Button, Spinner, Image } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { Gallery } from '../components'
import { ActionType, useStateContext } from '../state'
import { connectorsByName } from '../connectors'

const App = () => {
  const {
    dispatch,
    state: { user, activatingConnector },
  } = useStateContext()
  const { connector, activate } = useWeb3React()

  return (
    <Container>
      {!user ? (
        <>
          <Grid gap="1rem" columns="1fr 1fr">
            {Object.keys(connectorsByName).map((name: string) => {
              const currentConnector = connectorsByName[name as keyof typeof connectorsByName]
              const activating = currentConnector === activatingConnector
              const connected = currentConnector === connector

              return (
                <Button
                  mt={2}
                  variant="connect"
                  sx={{
                    borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                    position: 'relative',
                  }}
                  key={name}
                  onClick={() => {
                    dispatch({ type: ActionType.SET_CONNECTOR, payload: currentConnector })
                    activate(
                      connectorsByName[name as keyof typeof connectorsByName] as AbstractConnector
                    )
                  }}
                >
                  {activating && <Spinner />}
                  {currentConnector === connectorsByName.Metamask && (
                    <Image
                      sx={{ width: 35, height: 35 }}
                      mr={3}
                      src="https://docs.metamask.io/metamask-fox.svg"
                    />
                  )}
                  {name}
                </Button>
              )
            })}
          </Grid>
        </>
      ) : (
        <Gallery />
      )}
    </Container>
  )
}

export default App
