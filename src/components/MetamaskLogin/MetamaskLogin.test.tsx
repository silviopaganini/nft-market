import { render } from '@testing-library/react'
import { MetamaskLogin } from './MetamaskLogin'

test(`Renders MetamaskLogin`, () => {
  render(<MetamaskLogin onClickConnect={() => {}} />)
})
