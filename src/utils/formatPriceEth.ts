import { BigNumberish, utils } from 'ethers'

const formatPriceEth = (price: BigNumberish, ethPrice: string = '0') =>
  new Intl.NumberFormat('us-GB', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(utils.formatEther(price)) * Number(ethPrice))

export { formatPriceEth }
