import { TokenProps } from './components/Token'

declare global {
  interface Window {
    ethereum: any
  }
}

declare const ethereum: any

export type ContractPropsDetails = {
  name?: string
  symbol?: string
  address?: string
}

export type UserProps = {
  address: string
  balance: string
  ownedTokens: TokenProps[]
}
