import { ElementType } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import { useAppState } from '../../state'

type PrivateRouteProps = {
  component: ElementType
  path: string
}

const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
  const { isAuthenticated } = useAppState()

  return (
    <Route
      path={path}
      render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}

export { PrivateRoute }
