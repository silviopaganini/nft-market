import { render } from '@testing-library/react'
import Profile from './Profile'

test(`Renders ${name}`, () => {
  render(<Profile onSaleToken={() => {}} onTransferToken={() => {}} />)
})
