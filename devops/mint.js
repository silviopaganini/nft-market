const colors = require('colors')
const Web3 = require('web3')
const BCGNFT = artifacts.require('LVR.sol')

const { argv } = require('yargs')
  .usage(`${colors.yellow('Usage: ')}truffle exec start [options]`)
  .option('address', {
    alias: 'a',
    type: 'string',
    default: '0x',
  })
  .option('uri', {
    alias: 'u',
    type: 'string',
    default: '',
  })
  .option('price', {
    alias: 'p',
    type: 'string',
    default: 1,
  })
  .option('sale', {
    alias: 's',
    type: 'boolean',
    default: true,
  })
  .epilog(colors.blue('BCG Platinion copyright 2021'))

const start = async callback => {
  if (!argv.address || argv.address === '0x') {
    callback(`❌ ${colors.red('Address not set')}`)
    return
  }

  if (!argv.uri || argv.uri === '') {
    callback(`❌ ${colors.red('URI not set')}`)
    return
  }

  const { address, uri, price, sale } = argv

  try {
    const contract = await BCGNFT.deployed()

    const priceWei = Web3.utils.toWei(price, 'ether')
    const result = await contract.mintCollectable(address, uri, priceWei, sale)
    console.log(result)
    callback(colors.green(`⚡️ Token created: ${colors.white(uri)}`))
  } catch (e) {
    console.log(e)
    callback(colors.red(`❌ Token not created: ${colors.white(uri)}`))
  }
}

module.exports = start
