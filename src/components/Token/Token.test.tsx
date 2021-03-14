import { render } from '@testing-library/react'
import { BigNumber } from 'ethers'
import Token from './Token'

test(`Renders ${name}`, () => {
  render(
    <Token
      token={{
        id: '1',
        name: 'Token 1',
        uri: 'token1',
        price: BigNumber.from(1),
      }}
      onTransfer={async () => {
        return true
      }}
    />
  )
})
