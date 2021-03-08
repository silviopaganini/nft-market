import { recoverTypedSignatureLegacy } from 'eth-sig-util'
import Web3 from 'web3'

const signParams = [
  {
    type: 'string', // Any valid solidity type
    name: 'Action', // Any string label you want
    value: 'Signed login into NFT Prototype', // The value to sign
  },
]

const signUser = async (userAccount: string) =>
  new Promise((resolve, reject) => {
    Web3.givenProvider.sendAsync(
      {
        method: 'eth_signTypedData',
        params: [signParams, userAccount],
      },
      async (err: Error, result: any) => {
        if (err) {
          reject(err)
          return
        }

        const recovered = recoverTypedSignatureLegacy({
          data: signParams,
          sig: result.result,
        })

        if (Web3.utils.toChecksumAddress(recovered) === Web3.utils.toChecksumAddress(userAccount)) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    )
  })

export default signUser
