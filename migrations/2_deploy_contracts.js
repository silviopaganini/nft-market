const colors = require('colors')
const LVR = artifacts.require('LVR.sol')
const { deployProxy } = require('@openzeppelin/truffle-upgrades')

module.exports = async deployer => {
  const app = await deployProxy(LVR, { deployer, initializer: 'initialize' })
  const owner = await app.owner()
  console.log(colors.grey(`LVR contract owner: ${owner}`))
  console.log(colors.green('LVR contract address:'))
  console.log(colors.yellow(app.address))
}
