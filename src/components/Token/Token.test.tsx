import { render } from '@testing-library/react'
import Token from './Token'

test(`Renders ${name}`, () => {
  render(
    <Token
      token={{
        id: '1',
        uri: 'token1',
        price: '1000000000000000000',
      }}
      onTransfer={() => {}}
    />
  )
})
