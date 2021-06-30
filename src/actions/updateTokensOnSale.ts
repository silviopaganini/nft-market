import { Contract } from 'ethers'

import { ActionProps } from '.'
import { TokenProps } from '../components/Token'
import { ActionType } from '../state'

type Props = ActionProps<{
  contract: Contract
}>

// not used
// too heavy to load
// should've been in the contract 🤷‍♂️

// const getAllTokens = async ({ contract }: Props) => {
//   try {
//     const logs = await contract.provider.getLogs({
//       address: contract.address,
//       fromBlock: 0,
//       toBlock: 'latest',
//     })

//     const decoder = new utils.AbiCoder()

//     console.log(contract)

//     const tokens = await Promise.all<TokenProps>(
//       await logs.reduce<any>(async (acc: TokenProps[], log: Log) => {
//         const [from] = decoder.decode(['address'], log.topics[1])

//         const list = await acc

//         if (from === utils.getAddress('0x0000000000000000000000000000000000000000')) {
//           const tokenId =
//             log.topics && log.topics[3]
//               ? utils.formatUnits(BigNumber.from(log.topics[3]), 'wei')
//               : undefined

//           const token = tokenId && (await contract.tokenMeta(tokenId))
//           if (token) {
//             list.push(token)
//           }
//         }
//         return list
//       }, Promise.resolve([]) as Promise<TokenProps[]>)
//     )

//     return tokens
//   } catch (e) {
//     console.log(e)
//   }
// }

const updateTokensOnSale = async ({ contract, dispatch }: Props) => {
  try {
    // const allTokens = (await getAllTokens({ contract, dispatch })) || []

    // console.log(allTokens)

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
