import { Image, Flex, Button } from 'theme-ui'

export type MetamaskLoginProps = {
  onClickConnect(): void
}

const MetamaskLogin = ({ onClickConnect }: MetamaskLoginProps) => {
  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <Button
        sx={{ maxWidth: 200, mt: 5, px: 6, py: 4 }}
        variant="primary"
        onClick={onClickConnect}
      >
        <Image
          sx={{ width: 35, height: 35 }}
          mr={3}
          src="https://docs.metamask.io/metamask-fox.svg"
        />
        CONNECT
      </Button>
    </Flex>
  )
}

export default MetamaskLogin
