import { TokenProps } from '../components/Token'

const listTokensFrom = (contract: any, address: string) =>
  new Promise<TokenProps[]>(async (resolve, reject) => {
    if (!contract || !address) reject('Contract or address not found')

    try {
      const ownedTokensEvents = await contract.getPastEvents('Transfer', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
          to: address,
        },
      })

      const ownedTokens: TokenProps[] = (
        await Promise.all<TokenProps>(
          ownedTokensEvents.map(async (a: any) => {
            const ownerToken = await contract.methods.ownerOf(a.returnValues['2']).call()
            if (ownerToken !== address) return null

            return {
              id: a.returnValues['2'],
              uri: await contract.methods.tokenURI(a.returnValues.tokenId).call(),
              price: await contract.methods.tokenPrice(a.returnValues.tokenId).call(),
            }
          })
        )
      )
        .filter(a => a)
        .reduce((acc, item) => {
          if (!acc.find((a: TokenProps) => a.id === item.id)) {
            acc.push(item)
          }

          return acc
        }, [] as TokenProps[])

      resolve(ownedTokens)
    } catch (e) {
      reject(e)
    }
  })

export default listTokensFrom
