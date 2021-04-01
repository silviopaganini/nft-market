require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const colors = require('colors')
const fetch = require('node-fetch')
const { utils, ethers } = require('ethers')
const LVR = artifacts.require('LVR.sol')

const { REACT_APP_SERVICE_URL: SERVICE_URL } = process.env

const start = async callback => {
  try {
    const objectsToBeMinted = []

    const accounts = () =>
      new HDWalletProvider({
        mnemonic: process.env.KEY_MNEMONIC,
        providerOrUrl: process.env.WALLET_PROVIDER_URL,
      })

    const FROM = ethers.utils.getAddress(accounts().getAddresses()[0])

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
    const ipfsURLs = []

    const mintedTokens = await Promise.all(
      mintAssetsOnIPFS.map(async token => {
        ipfsURLs.push({
          name: token.name,
          path: token.path,
        })
        return await contract.mintCollectable(FROM, token.path, token.name, priceWei, true, {
          from: FROM,
        })
      })
    )

    console.log(JSON.stringify(ipfsURLs))

    callback(colors.green(`⚡️ Tokens created: ${colors.white(mintedTokens.length)}`))
  } catch (e) {
    callback(e)
  }
}

module.exports = start
