require('dotenv').config()
const colors = require('colors')
const fetch = require('node-fetch')
const { utils } = require('ethers')
const LVR = artifacts.require('LVR.sol')

const ADDRESS = '0x4545f57c253B8e610C7CC891df62C3EF497ce5Bf'

const { SERVICE_URL } = process.env

const start = async callback => {
  try {
    const objectsToBeMinted = []

    for (let i = 1; i < 11; i++) {
      objectsToBeMinted.push(`Robot ${i}`)
    }

    const mintAssetsOnIPFS = await (
      await fetch(`${SERVICE_URL}/mint`, {
        method: 'POST',
        body: JSON.stringify({ objectsToBeMinted }),
      })
    ).json()

    const contract = await LVR.deployed()
    const price = '0.5'

    const priceWei = utils.parseEther(price)

    const mintedTokens = await Promise.all(
      mintAssetsOnIPFS.map(async token => {
        return await contract.mintCollectable(ADDRESS, token.path, token.name, priceWei, true)
      })
    )

    callback(colors.green(`⚡️ Tokens created: ${colors.white(mintedTokens.length)}`))
  } catch (e) {
    callback(e)
  }
}

module.exports = start
