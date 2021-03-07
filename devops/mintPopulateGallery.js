const colors = require('colors')
const Web3 = require('web3')
const BCGNFT = artifacts.require('LVR.sol')

const ADDRESS = '0x4545f57c253B8e610C7CC891df62C3EF497ce5Bf'

const start = async callback => {
  try {
    const contract = await BCGNFT.deployed()
    const price = '0.5'

    const priceWei = Web3.utils.toWei(price, 'ether')

    const minting = []

    for (let i = 1; i < 11; i++) {
      minting.push(await contract.mintCollectable(ADDRESS, `robot-${i}`, priceWei, true))
    }

    const result = await Promise.all(minting)
    console.log(result)
    callback(colors.green(`⚡️ Tokens created: ${colors.white(10)}`))
  } catch (e) {
    callback(e)
  }
}

module.exports = start
