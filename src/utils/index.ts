const { REACT_APP_APIETHERSCAN, REACT_APP_SERVICE_URL } = process.env

export { default as listTokensFrom } from './listTokensFrom'

export const ETHSCAN_API = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${REACT_APP_APIETHERSCAN}`

export const METADATA_API = REACT_APP_SERVICE_URL || ''
