import { Contract, Event } from 'ethers'
import { TokenProps } from '../components/Token'

const listTokensFrom = (contract: Contract, address: string) =>
  new Promise<TokenProps[]>(async (resolve, reject) => {
    if (!contract || !address) reject('Contract or address not found')

    try {
      const ownedTokensEvents = contract.filters.Transfer(null, address)
      const results: Event[] = await contract.queryFilter(ownedTokensEvents, 0, 'latest')

      const ownedTokens: Map<string, TokenProps> = new Map()
      await Promise.all(
        results.map(async current => {
          const ownerToken = await contract.ownerOf(current.args?.tokenId)

          if (ownerToken === address) {
            const { id, name, price } = await contract.tokenMeta(current.args?.tokenId)
            const uri = await contract.tokenURI(current.args?.tokenId)

            ownedTokens.set(uri, {
              id,
              name,
              price,
              uri,
            })
          }
        })
      )

      resolve(Array.from(ownedTokens).map(([_, token]) => token))
    } catch (e) {
      reject(e)
    }
  })

export default listTokensFrom
