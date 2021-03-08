import { Flex, Heading, Box } from 'theme-ui'
import { toSvg } from 'jdenticon'
import { useStateContext } from '../../state'
import { useHistory } from 'react-router'

export type UserMenuProps = {
  //
}

const UserMenu = () => {
  const {
    state: { user, isAuthenticated },
  } = useStateContext()

  const history = useHistory()

  return (
    <Flex sx={{ ml: 'auto', justifySelf: 'flex-end' }}>
      {isAuthenticated && user && (
        <>
          <Heading sx={{ color: 'white' }} as="h5">
            {user.address}
          </Heading>
          <Box
            onClick={() => {
              history.push('/profile')
            }}
            sx={{
              cursor: 'pointer',
              ml: 3,
              height: 30,
              width: 30,
              bg: 'white',
              borderRadius: '100%',
            }}
            dangerouslySetInnerHTML={{ __html: toSvg(user.address, 30) }}
          />
        </>
      )}
    </Flex>
  )
}

export default UserMenu
