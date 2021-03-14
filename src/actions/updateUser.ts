import { utils } from 'ethers'
import { ActionProps } from '.'
import { ActionType } from '../state'
import listTokensFrom from '../utils/listTokensFrom'

type Props = ActionProps<{
  userAccount: string
  contract: any
}>

const updateUser = async ({ contract, userAccount, library, dispatch }: Props) => {
  try {
    const balance = utils.formatEther(await library.getBalance(userAccount))
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
