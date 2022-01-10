import { useAppState } from '../state'

export const fetcherETHUSD = async (url: string) => {
  try {
    const { setEthPrice } = useAppState.getState()

    const {
      result: { ethusd },
    } = await (await fetch(url)).json()
    setEthPrice(ethusd)
  } catch (e) {
    console.log(e)
  }
}

export const fetcherMetadata = async (url: string) => {
  try {
    return await (await fetch(url)).json()
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export const fetchOwner = async (id: string) => {
  try {
    const { contract } = useAppState.getState()
    if (!contract) throw new Error('Contract not found')

    return await contract?.ownerOf(id)
  } catch (e) {
    return { error: (e as Error).message }
  }
}
