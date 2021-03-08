import { ActionProps } from '.'
import LVR from '../contracts/LVR.json'
import { ActionType } from '../state'

type Props = ActionProps<{}>

const getContract = async ({ state, dispatch }: Props) => {
  const { web3 } = state
  if (!web3) throw new Error('No Web3 Found')

  try {
    const networkId = (await web3.eth.net.getId()).toString()

    //@ts-ignore
    const deployedNetwork = LVR.networks[networkId]
    const contract = new web3.eth.Contract(
      //@ts-ignore
      LVR.abi,
      deployedNetwork && deployedNetwork.address
    )

    const address = deployedNetwork.address

    const name = await contract.methods.name().call()
    const symbol = await contract.methods.symbol().call()
    const totalSupply = await contract.methods.totalSupply().call()

    dispatch({
      type: ActionType.CONTRACT,
      payload: {
        payload: contract,
        details: {
          address,
          name,
          symbol,
          totalSupply,
        },
      },
    })

    return contract
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

export default getContract
