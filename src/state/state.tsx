import { createContext, FC, Reducer, useContext, useReducer } from 'react'
import { TokenProps } from '../components/Token'
import { ContractProps, UserProps } from '../types'

import { reducer, Action } from './reducer'

export interface StateContext {
  isAuthenticated: boolean
  contract?: ContractProps
  user?: UserProps
  tokensOnSale?: TokenProps[]
  ethPrice?: string
}
export interface Store {
  state: StateContext
  dispatch: React.Dispatch<Action>
}

const defaultState: StateContext = {
  isAuthenticated: false,
}

const myContext = createContext<Store>({ state: defaultState, dispatch: () => {} })

export const useStateContext = () => useContext(myContext)

export const StateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<StateContext, Action>>(reducer, defaultState)
  return <myContext.Provider value={{ state, dispatch }} children={children} />
}
