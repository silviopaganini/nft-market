import { render } from '@testing-library/react'
import { ActivityLine } from './ActivityLine'

test(`Renders ActivityLine`, () => {
  render(<ActivityLine activity={{ name: 'robot-1', time: new Date() }} />)
})
