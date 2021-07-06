import { render } from '@testing-library/react'
import { BigNumber } from 'ethers'
import { Token } from './Token'

test(`Renders Token`, () => {
  render(
    <Token
      token={{
        id: '1',
        name: 'Token 1',
        uri: 'token1',
        price: BigNumber.from(1),
      }}
    />
  )
})
