import { Redirect } from 'react-router'
import { Container } from 'theme-ui'
import { Profile } from '../components'
import { useStateContext } from '../state'

const ProfilePage = () => {
  const {
    state: { isAuthenticated },
  } = useStateContext()
  if (!isAuthenticated) {
    return <Redirect to="/" />
  }
  return (
    <Container>
      <Profile />
    </Container>
  )
}

export default ProfilePage
