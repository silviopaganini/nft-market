import { Dispatch } from 'react'
import { Action } from '../state'

export { default as updateUser } from './updateUser'
export { default as getContract } from './getContract'

export type ActionProps<Props> = Props & {
  library: any
  dispatch: Dispatch<Action>
}
