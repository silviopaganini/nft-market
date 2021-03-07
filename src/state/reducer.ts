import Web3 from 'web3'
import { TokenProps } from '../components/Token'
import { ContractProps, UserProps } from '../types'
import { StateContext } from './state'

export enum ActionType {
  UPDATE_USER = 'Update User',
  SIGN_OUT = 'Sign out',
  WEB3_INIT = 'Web3 Init',
  CONTRACT = 'Contract',
  LOAD_TOKEN_SALE = 'Load tokens on Sale',
}

export type Action =
  | { type: ActionType.WEB3_INIT; payload: Web3 }
  | { type: ActionType.CONTRACT; payload: ContractProps }
  | { type: ActionType.UPDATE_USER; payload: UserProps }
  | { type: ActionType.SIGN_OUT; payload?: any }
  | { type: ActionType.LOAD_TOKEN_SALE; payload?: TokenProps[] }

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_USER:
      return { ...state, isAuthenticated: true, user: action.payload }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false, user: undefined }

    case ActionType.WEB3_INIT:
      return { ...state, web3: action.payload }

    case ActionType.LOAD_TOKEN_SALE:
      return { ...state, tokensOnSale: action.payload }

    case ActionType.CONTRACT:
      return { ...state, contract: action.payload }

    default:
      throw new Error('Not among actions')
  }
}
