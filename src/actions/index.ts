import { Dispatch } from 'react'
import { Action } from '../state'

export { default as updateUser } from './updateUser'
export { default as getContract } from './getContract'
export { default as updateTokensOnSale } from './updateTokensOnSale'

export type ActionProps<Props> = Props & {
  library?: any
  dispatch: Dispatch<Action>
}
