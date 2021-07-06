import { Flex, Heading, Box } from 'theme-ui'
import { useHistory } from 'react-router'
import { EtherSymbol } from '@ethersproject/constants'
import { useAppState } from '../../state'
import { Identicon } from '..'
import { toShort } from '../../utils'

export type UserMenuProps = {
  //
}

const UserMenu = () => {
  const { user, isAuthenticated } = useAppState()

  const history = useHistory()

  return (
    <Flex sx={{ ml: 'auto', justifySelf: 'flex-end' }}>
      {isAuthenticated && user && (
        <>
          <Box sx={{ display: ['none', 'block'] }}>
            <Heading sx={{ p: 0, color: 'white' }} as="h4">
              {toShort(user.address)}
            </Heading>
            <Heading sx={{ p: 0, mt: 1, textAlign: 'right', color: 'white' }} as="h5">
              {EtherSymbol}
              {user.balance}
            </Heading>
          </Box>
          <Box
            onClick={() => {
              history.push('/profile')
            }}
            sx={{
              cursor: 'pointer',
              ml: [0, 3],
              height: 30,
              width: 30,
              borderRadius: '100%',
            }}
          >
            <Identicon size={30} address={user.address} />
          </Box>
        </>
      )}
    </Flex>
  )
}

export { UserMenu }
