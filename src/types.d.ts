import { Contract } from 'ethers'
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
  totalSupply?: number
  address?: string
}

export type ContractProps = {
  payload: Contract
  details: ContractPropsDetails
}

export type UserProps = {
  address: string
  balance: string
  ownedTokens: TokenProps[]
}
