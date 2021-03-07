import Web3 from 'web3'

const { HOST, PORT } = process.env

const getWeb3 = () =>
  new Promise<Web3>((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        try {
          resolve(web3)
        } catch (error) {
          reject(error)
        }
      }
      // Legacy dapp browsers...
      //@ts-ignore
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        //@ts-ignore
        const web3 = window.web3
        console.log('Injected web3 detected.')
        resolve(web3)
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(`http://${HOST}:${PORT}`)
        const web3 = new Web3(provider)
        console.log('No web3 instance injected, using Local web3.')
        resolve(web3)
      }
    })
  })

export default getWeb3
