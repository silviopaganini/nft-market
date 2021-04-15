const { REACT_APP_SERVICE_URL } = process.env

export const ETHSCAN_API = `${REACT_APP_SERVICE_URL}/ethusd`
export const METADATA_API = REACT_APP_SERVICE_URL || ''

export { default as listTokensFrom } from './listTokensFrom'
export { default as toShort } from './toShort'
