import { ActionProps } from '.'
import { TokenProps } from '../components/Token'
import { ActionType } from '../state'

type Props = ActionProps<{
  contract: any
}>

const updateTokensOnSale = async ({ contract, dispatch }: Props) => {
  try {
    const tokensForSale = (await contract.getAllOnSale()).reduce((acc: TokenProps[], b: any) => {
      if (b.uri !== '') {
        acc.push({ id: b.id, price: b.price, name: b.name, uri: b.uri })
      }

      return acc
    }, [] as TokenProps[])

    dispatch({ type: ActionType.LOAD_TOKEN_SALE, payload: tokensForSale })
  } catch (e) {
    console.log(e)
  }
}

export default updateTokensOnSale
