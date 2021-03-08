import Web3 from 'web3'
import { ActionProps } from '.'
import { ActionType } from '../state'
import listTokensFrom from '../utils/listTokensFrom'

type Props = ActionProps<{
  userAccount: string
  contract: any
}>

const updateUser = async ({ contract, userAccount, state, dispatch }: Props) => {
  try {
    const { web3 } = state
    if (!web3) throw new Error('No web3')

    const balance = Web3.utils.fromWei(await web3?.eth.getBalance(userAccount))

    const ownedTokens = await listTokensFrom(contract, userAccount)

    dispatch({
      type: ActionType.UPDATE_USER,
      payload: {
        address: userAccount,
        balance,
        ownedTokens,
      },
    })
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

export default updateUser
