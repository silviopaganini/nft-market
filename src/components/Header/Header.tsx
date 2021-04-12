import { useHistory } from 'react-router'
import { Flex, Heading, Image, Text } from 'theme-ui'
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
      <Heading sx={{ ml: [1, 2], color: 'white' }} as="h4">
        ERC721 Marketplace{' '}
        <Text sx={{ display: ['none', 'block'] }}>+ OpenSea.io on Rinkeby Network</Text>
      </Heading>
      <UserMenu />
    </Flex>
  )
}

export default Header
