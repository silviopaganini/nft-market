import { ElementType } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import { useStateContext } from '../../state'

type PrivateRouteProps = {
  component: ElementType
  path: string
}

const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
  const {
    state: { isAuthenticated },
  } = useStateContext()

  return (
    <Route
      path={path}
      render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}

export default PrivateRoute
