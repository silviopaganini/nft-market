import { render } from '@testing-library/react'
import MetamaskLogin from './MetamaskLogin'

test(`Renders ${name}`, () => {
  render(<MetamaskLogin onClickConnect={() => {}} />)
})
