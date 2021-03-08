import Web3 from 'web3'

const toWei = (number: string) => Web3.utils.toWei(number, 'ether')
export default toWei
