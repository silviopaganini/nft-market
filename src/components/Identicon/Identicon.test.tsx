import { render } from '@testing-library/react'
import { Identicon } from './Identicon'

test(`Renders Identicon`, () => {
  render(<Identicon address="0x12371892371982379sdas" />)
})
