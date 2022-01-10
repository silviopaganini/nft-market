import { InjectedConnector } from '@web3-react/injected-connector'
// import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { WalletLinkConnector } from '@web3-react/walletlink-connector'
// import { LedgerConnector } from '@web3-react/ledger-connector'
// import { TrezorConnector } from '@web3-react/trezor-connector'
// import { LatticeConnector } from '@web3-react/lattice-connector'
// import { FrameConnector } from '@web3-react/frame-connector'
// import { AuthereumConnector } from '@web3-react/authereum-connector'
// // import { FortmaticConnector } from '@web3-react/fortmatic-connector'
// // import { MagicConnector } from '@web3-react/magic-connector'
// // import { PortisConnector } from '@web3-react/portis-connector'
// import { TorusConnector } from '@web3-react/torus-connector'

export enum ConnectorNames {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect',
}

// const POLLING_INTERVAL = 12000
const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.REACT_APP_RPC_URL_1 as string,
  4: process.env.REACT_APP_RPC_URL_4 as string,
}

export const injected = new InjectedConnector({ supportedChainIds: [5777, 1337, 4] })

// export const network = new NetworkConnector({
//   urls: {
//     1337: RPC_URLS[1],
//     4: RPC_URLS[4],
//   },
//   defaultChainId: 1337,
// })

export const walletconnect = new WalletConnectConnector({
  qrcode: true,
  // pollingInterval: POLLING_INTERVAL,
  infuraId: process.env.REACT_APP_INFURA_ID,
  rpc: { 4: RPC_URLS[4] },
  chainId: 4,
  supportedChainIds: [4],
})

// export const walletlink = new WalletLinkConnector({
//   url: RPC_URLS[1],
//   appName: 'NFT-marketplace',
// })

// export const ledger = new LedgerConnector({
//   chainId: 1,
//   url: RPC_URLS[1],
//   pollingInterval: POLLING_INTERVAL,
// })

// export const trezor = new TrezorConnector({
//   chainId: 1,
//   url: RPC_URLS[1],
//   pollingInterval: POLLING_INTERVAL,
//   manifestEmail: 'dummy@abc.xyz',
//   manifestAppUrl: 'http://localhost:3000',
// })

// export const lattice = new LatticeConnector({
//   chainId: 4,
//   appName: 'NFT-marketplace',
//   url: RPC_URLS[4],
// })

// export const frame = new FrameConnector({ supportedChainIds: [1] })

// export const authereum = new AuthereumConnector({ chainId: 42 })

// export const fortmatic = new FortmaticConnector({
//   apiKey: process.env.REACT_APP_FORTMATIC_API_KEY as string,
//   chainId: 4,
// })

// export const magic = new MagicConnector({
//   apiKey: process.env.REACT_APP_MAGIC_API_KEY as string,
//   chainId: 4,
//   email: 'hello@example.org',
// })

// export const portis = new PortisConnector({
//   dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
//   networks: [1, 100],
// })

// export const torus = new TorusConnector({ chainId: 1 })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Metamask]: injected,
  // [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  // [ConnectorNames.WalletLink]: walletlink,
  // [ConnectorNames.Ledger]: ledger,
  // [ConnectorNames.Trezor]: trezor,
  // [ConnectorNames.Lattice]: lattice,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Authereum]: authereum,
  // [ConnectorNames.Fortmatic]: fortmatic,
  // [ConnectorNames.Magic]: magic,
  // [ConnectorNames.Portis]: portis,
  // [ConnectorNames.Torus]: torus,
}
