import { render } from '@testing-library/react'
import ActivityLine from './ActivityLine'

test(`Renders ${name}`, () => {
  render(<ActivityLine activity={{ tokenId: 'robot-1', time: new Date() }} />)
})
