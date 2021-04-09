# ERC721 NFT Marketplace 

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![GitHub](https://img.shields.io/github/license/silviopaganini/nft-market?style=flat-square)


Prototype of a NFT Marketplace based on openZeppelin abstract upgradeable ERC721 contracts and Minting/uploading images to IPFS and integration with Opensea.io

The following functionalities were tested: 

1. Buy a pre-minted token.
2. Sell the token that was bought.
3. Transferring ETH to the previous token holder;
4. Adding and removing tokens from the marketplace;
5. Minting tokens;
6. Uploading NFT image to IPFS;
7. Metadata and marketplace on Opensea.io
8. Metadata and IPFS Lambda functions on AWS

<hr />

See the [source for the IPFS and Metadata Lambda service](https://github.com/silviopaganini/nft-market-service)

See it live on [Rinkeby Network](https://nft.s2paganini.com) 

See [my portfolio](https://s2paganini.com/case/ckm0zl44o0w1i0a54lryryi1d) for more details 

<hr />

## ⚡️ Tech-Stack

- Typescript
- Solidity
- React
- Truffle / Ganache
- Storybook
- openZeppelin
- Metamask (web3)
- Opensea.io
- Web3-react
- IPFS
- Lambda AWS
- serverless

## 🔧 .env file 

```
KEY_MNEMONIC=
WALLET_PROVIDER_URL=http://0.0.0.0:7545
RPC_HOST=0.0.0.0
NODE_ENV=development
BROWSER=chrome
REACT_APP_APIETHERSCAN=
REACT_APP_SERVICE_URL=http://localhost:4000/dev
REACT_APP_RPC_URL_1=http://0.0.0.0:7545
REACT_APP_RPC_URL_4=https://rinkeby.infura.io/v3/{INFURA_PROJECT_ID}
INFURA_PROJECT_ID=
```

## 💰 Sponsor this project

Donations in ETH or BTC are welcome 

**ETH** 0xD20634a78Fa0e98104419a63C278648ccCff4Ce7

**BTC** 35pDYqWj5zyogGbNb15W44e9veu6899cZj