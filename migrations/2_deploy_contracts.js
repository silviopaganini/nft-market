const colors = require('colors')
const LVR = artifacts.require('LVR.sol')

module.exports = function (deployer) {
  deployer.deploy(LVR).then(result =>
    LVR.deployed().then(app => {
      console.log('\n\n')
      console.log(colors.green('LVR contract address:'))
      console.log(colors.yellow(app.address))
      console.log('\n')
    })
  )
}
