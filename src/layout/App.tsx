import { useState } from 'react'
import { Heading, Container, Divider } from 'theme-ui'
import Web3 from 'web3'
import { recoverTypedSignatureLegacy } from 'eth-sig-util'
import LVR from '../contracts/LVR.json'
import { Gallery, MetamaskLogin, Profile } from '../components'
import { ActionType, useStateContext } from '../state'
import listTokensFrom from '../utils/listTokensFrom'

// TODO: Show event of token sold
// Buy Token Button can't show if you own the token
//69.9681798

const App = () => {
  const {
    state: { web3, contract, user },
    dispatch,
  } = useStateContext()
  const [error, setError] = useState<boolean>(false)

  const onClickConnect = async () => {
    if (!web3) return
    try {
      const [address] = await web3.eth.getAccounts()

      const networkId = (await web3.eth.net.getId()).toString()

      //@ts-ignore
      const deployedNetwork = LVR.networks[networkId]
      const contract = new web3.eth.Contract(
        //@ts-ignore
        LVR.abi,
        deployedNetwork && deployedNetwork.address
      )

      const signParams = [
        {
          type: 'string', // Any valid solidity type
          name: 'Action', // Any string label you want
          value: 'Signed login into NFT Prototype', // The value to sign
        },
      ]

      Web3.givenProvider.sendAsync(
        {
          method: 'eth_signTypedData',
          params: [signParams, address],
        },
        async (err: Error, result: any) => {
          if (err) {
            setError(true)
            return
          }

          const recovered = recoverTypedSignatureLegacy({
            data: signParams,
            sig: result.result,
          })

          if (Web3.utils.toChecksumAddress(recovered) === Web3.utils.toChecksumAddress(address)) {
            const balance = Web3.utils.fromWei(await web3?.eth.getBalance(address))

            const ownedTokens = await listTokensFrom(contract, address)

            const name = await contract.methods.name().call()
            const symbol = await contract.methods.symbol().call()
            const totalSupply = await contract.methods.totalSupply().call()

            dispatch({
              type: ActionType.CONTRACT,
              payload: {
                payload: contract,
                details: {
                  address: deployedNetwork.address,
                  name,
                  symbol,
                  totalSupply,
                },
              },
            })

            dispatch({
              type: ActionType.UPDATE_USER,
              payload: {
                address,
                balance,
                ownedTokens,
              },
            })
          }
        }
      )
    } catch (e) {
      setError(true)
      console.log(e)
    }
  }

  const onConfirmTransfer = async () => {
    if (!user || !user.address || !web3) return
    const ownedTokens = await listTokensFrom(contract?.payload, user.address)
    const balance = Web3.utils.fromWei(await web3?.eth.getBalance(user.address))
    dispatch({ type: ActionType.UPDATE_USER, payload: { ...user, balance, ownedTokens } })
  }

  const onTransferToken = ({ id, address }: { id: string; address: string }) => {
    if (!contract?.payload) return

    try {
      contract?.payload.methods
        .safeTransferFrom(user?.address, address, id)
        .send({ from: user?.address })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', onConfirmTransfer)
        .on('confirmation', onConfirmTransfer)
        .on('error', console.error)
    } catch (e) {
      console.log(e)
    }
  }

  const onBuyToken = async ({ id, price }: { id: string; price: string }) => {
    if (!contract?.payload) return

    try {
      contract.payload.methods
        .purchaseToken(id)
        .send({ from: user?.address, value: price })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', onConfirmTransfer)
        .on('confirmation', onConfirmTransfer)
        .on('error', console.error)

      // .on('transactionHash', function (hash: any) {
      //   console.log(hash)
      // })
      // .on('receipt', onConfirmTransfer)
      // .on('confirmation', onConfirmTransfer)
      // .on('error', console.error)
    } catch (e) {}
  }

  const onSaleToken = async ({
    id,
    price,
    onSale = true,
  }: {
    id: string
    price: string
    onSale?: boolean
  }) => {
    if (!contract?.payload || !user?.address) return
    try {
      await contract.payload.methods
        .setTokenSale(id, onSale, Web3.utils.toWei(price, 'ether'))
        .send({ from: user.address })

      onConfirmTransfer()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Container>
        {error ? (
          <Heading as="h3">Please connect to Metamask.</Heading>
        ) : (
          <>
            {!user || !user.address ? (
              <MetamaskLogin onClickConnect={onClickConnect} />
            ) : (
              <>
                <Gallery onBuyToken={onBuyToken} />
                <Divider />
                <Profile onSaleToken={onSaleToken} onTransferToken={onTransferToken} />
              </>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default App
