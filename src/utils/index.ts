const { REACT_APP_SERVICE_URL } = process.env

export const ETHSCAN_API = `${REACT_APP_SERVICE_URL}/ethusd`
export const METADATA_API = REACT_APP_SERVICE_URL || ''

export * from './toShort'
export * from './formatPriceEth'
