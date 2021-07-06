import NFTT from '@fluuuid/nft-contracts/build/contracts/NFTT.json'
import create from 'zustand'
import { BigNumber, Contract, utils, Event } from 'ethers'

import { TokenProps } from '../components/Token'
import { ContractPropsDetails, UserProps } from '../types'
export interface StateContext {
  isAuthenticated: boolean
  contract?: Contract
  contractDetails?: ContractPropsDetails
  user?: UserProps
  tokensOnSale?: TokenProps[]
  ethPrice?: string
  activatingConnector?: any
  transaction?: any
  library?: any

  setAuthenticated(authenticated: boolean): void
  setContract(library: any, chainId: number): void
  setTokensOnSale(tokensOnSale: TokenProps[]): void
  setEthPrice(ethPrice: string): void
  setActivatingConnector(activatingConnector: any): void
  setTransaction(transaction: any): void
  //
  buyToken(id: string, price: BigNumber): void
  setUser(address?: string): void
  updateTokensOnSale(): Promise<boolean>
  setTokenSale(id: string, price: BigNumber, onSale: boolean): Promise<boolean>
  transferToken(id: string, to: string): void
  getUserTokens(address?: string): Promise<TokenProps[]>
}

const useAppState = create<StateContext>((set, get) => ({
  isAuthenticated: false,
  contract: undefined,
  user: undefined,
  tokensOnSale: [],
  ethPrice: '0.0',
  activatingConnector: undefined,
  transaction: undefined,

  setAuthenticated: (authenticated: boolean) => set({ isAuthenticated: authenticated }),
  setContract: async (library: any, chainId: number) => {
    try {
      if (!library) throw new Error('No Web3 Found')

      const networkid = (id: number) => {
        switch (id) {
          case 1337:
            return 5777
          default:
            return id
        }
      }
      const deployedNetwork =
        NFTT.networks[String(networkid(chainId)) as keyof typeof NFTT.networks]

      if (!deployedNetwork) {
        throw new Error('The network you selected is no supported yet.')
      }

      const { address } = deployedNetwork
      const contract = new Contract(address, NFTT.abi, library.getSigner())

      const name = await contract.name()
      const symbol = await contract.symbol()

      set({
        library,
        contract,
        contractDetails: {
          name,
          symbol,
          address,
        },
      })
    } catch (e) {
      console.log(e)
    }
  },
  setUser: async (address?: string) => {
    try {
      const { contract, user, library, getUserTokens } = get()

      if (!library) throw new Error('No Web3 Found')
      if (!contract) throw new Error('No contract found')
      if (!user && !address) throw new Error('No user found')

      const balance = utils.formatEther(await library.getBalance(address || user?.address || ''))
      const ownedTokens = await getUserTokens(address || user?.address)

      set({
        isAuthenticated: true,
        user: { address: address || user?.address || '', balance, ownedTokens },
      })
    } catch (e) {
      console.log(e)
    }
  },
  setTokensOnSale: (tokensOnSale: TokenProps[]) => set({ tokensOnSale: tokensOnSale }),
  setEthPrice: (ethPrice: string) => set({ ethPrice: ethPrice }),
  setActivatingConnector: (activatingConnector: any) =>
    set({ activatingConnector: activatingConnector }),
  setTransaction: (transaction: any) => set({ transaction: transaction }),

  //
  getUserTokens: async (address?: string): Promise<TokenProps[]> => {
    try {
      const { contract, library, user } = get()

      if (!library) throw new Error('No Web3 Found')
      if (!contract) throw new Error('No contract found')
      if (!user?.address && !address) throw new Error('No user found')

      const userAddress = user?.address || address

      const ownedTokensEvents = contract.filters.Transfer(null, userAddress)
      const results: Event[] = await contract.queryFilter(ownedTokensEvents, 0, 'latest')

      const ownedTokens: Map<string, TokenProps> = new Map()
      await Promise.all(
        results.map(async current => {
          const ownerToken = await contract.ownerOf(current.args?.tokenId)

          if (ownerToken === userAddress) {
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

      return Array.from(ownedTokens).map(([_, token]) => token)
    } catch (e) {
      console.log(e)
      return []
    }
  },

  buyToken: async (id: string, price: BigNumber) => {
    try {
      const { setTransaction, contract } = get()
      if (!contract) throw new Error('No contract found')
      const tx = await contract.purchaseToken(id, { value: price })
      setTransaction(tx)
    } catch (e) {
      console.log('on buy', e)
    }
  },
  //
  updateTokensOnSale: async () => {
    try {
      const { contract, setTokensOnSale } = get()
      if (!contract) throw new Error('No contract found')

      const tokensForSale = (await contract.getAllOnSale()).reduce((acc: TokenProps[], b: any) => {
        if (b.uri !== '') {
          acc.push({ id: b.id, price: b.price, name: b.name, uri: b.uri })
        }

        return acc
      }, [] as TokenProps[])
      setTokensOnSale(tokensForSale)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  },
  //
  setTokenSale: async (id: string, price: BigNumber, onSale: boolean = false) => {
    try {
      const { contract, user, setTransaction } = get()
      if (!contract) throw new Error('No contract found')
      if (!user) throw new Error('No user found')

      const tx = await contract.setTokenSale(id, onSale, price, { from: user.address })
      setTransaction(tx)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  },
  //
  transferToken: async (id: string, to: string) => {
    try {
      const { contract, user, setTransaction } = get()
      if (!contract) throw new Error('No contract found')
      if (!user) throw new Error('No user found')

      const tx = await contract['safeTransferFrom(address,address,uint256)'](user.address, to, id, {
        from: user.address,
      })

      // console.log(tx)
      setTransaction(tx)
    } catch (e) {
      console.log(e)
    }
  },
}))

export { useAppState }

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
