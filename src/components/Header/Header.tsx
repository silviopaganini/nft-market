import { Flex, Heading, Image } from 'theme-ui'

export type HeaderProps = {
  //
}

const Header = () => {
  return (
    <Flex sx={{ alignItems: 'center', bg: 'black', p: 3 }} as="nav">
      <Image sx={{ width: 50 }} src="/static/logo.png" />
      <Heading sx={{ ml: 2, color: 'white' }} as="h4">
        Ethereum prototype | Metamask + ERC721 Contract
      </Heading>
    </Flex>
  )
}

export default Header
