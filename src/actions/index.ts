import { Dispatch } from 'react'
import { Action, StateContext } from '../state'

export { default as updateUser } from './updateUser'
export { default as getContract } from './getContract'
export { default as signUser } from './signUser'

export type ActionProps<Props> = Props & {
  state: StateContext
  dispatch: Dispatch<Action>
}
