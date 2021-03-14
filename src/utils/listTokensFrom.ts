import { Contract, Event } from 'ethers'
import { TokenProps } from '../components/Token'

const listTokensFrom = (contract: Contract, address: string) =>
  new Promise<TokenProps[]>(async (resolve, reject) => {
    if (!contract || !address) reject('Contract or address not found')

    try {
      const ownedTokensEvents = contract.filters.Transfer(null, address)
      const results: Event[] = await contract.queryFilter(ownedTokensEvents, 0, 'latest')

      const ownedTokens: TokenProps[] = await Promise.all(
        await results.reduce(async (acc: Promise<TokenProps[]>, current: Event) => {
          const accumulator = await acc

          const ownerToken = await contract.ownerOf(current.args?.tokenId)

          if (ownerToken === address) {
            const { id, name, price, uri } = await contract.tokenMeta(current.args?.tokenId)

            accumulator.push({
              id,
              name,
              price,
              uri,
            })
          }

          return accumulator
        }, Promise.resolve([] as TokenProps[]))
      )

      resolve(ownedTokens)
    } catch (e) {
      reject(e)
    }
  })

export default listTokensFrom
