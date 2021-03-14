const { REACT_APP_APIETHERSCAN } = process.env

export { default as listTokensFrom } from './listTokensFrom'

export const ETHSCAN_API = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${REACT_APP_APIETHERSCAN}`
