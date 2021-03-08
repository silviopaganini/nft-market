import { useHistory } from 'react-router'
import { Flex, Heading, Image } from 'theme-ui'
import { UserMenu } from '..'

export type HeaderProps = {
  //
}

const Header = () => {
  const history = useHistory()
  return (
    <Flex sx={{ alignItems: 'center', bg: 'black', p: 3 }} as="nav">
      <Image
        onClick={() => {
          history.push('/')
        }}
        sx={{ width: 50, cursor: 'pointer' }}
        src="/static/logo.png"
      />
      <Heading sx={{ ml: 2, color: 'white' }} as="h4">
        Ethereum prototype | Metamask + ERC721 Contract
      </Heading>
      <UserMenu />
    </Flex>
  )
}

export default Header
