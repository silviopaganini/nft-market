import { TokenProps } from '../components/Token'
import { ContractProps, UserProps } from '../types'
import { StateContext } from './state'

export enum ActionType {
  UPDATE_USER = 'Update User',
  SIGN_OUT = 'Sign out',
  CONTRACT = 'Contract',
  LOAD_TOKEN_SALE = 'Load tokens on Sale',
  ETH_PRICE = 'Eth price',
  SET_CONNECTOR = 'Set Connector',
  SET_TRANSACTION = 'Set Transaction',
}

export type Action =
  | { type: ActionType.ETH_PRICE; payload: string }
  | { type: ActionType.CONTRACT; payload: ContractProps }
  | { type: ActionType.UPDATE_USER; payload: UserProps }
  | { type: ActionType.SIGN_OUT; payload?: any }
  | { type: ActionType.SET_CONNECTOR; payload?: any }
  | { type: ActionType.SET_TRANSACTION; payload?: any }
  | { type: ActionType.LOAD_TOKEN_SALE; payload?: TokenProps[] }

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.ETH_PRICE:
      return { ...state, ethPrice: action.payload }
    case ActionType.SET_CONNECTOR:
      return { ...state, activatingConnector: action.payload }
    case ActionType.UPDATE_USER:
      return { ...state, isAuthenticated: true, user: action.payload }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false, user: undefined }

    case ActionType.LOAD_TOKEN_SALE:
      return { ...state, tokensOnSale: action.payload }

    case ActionType.CONTRACT:
      return { ...state, contract: action.payload }

    case ActionType.SET_TRANSACTION:
      return { ...state, transaction: action.payload }

    default:
      throw new Error('Not among actions')
  }
}
