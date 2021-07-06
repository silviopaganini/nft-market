import { Image, Flex, Button } from 'theme-ui'

export type MetamaskLoginProps = {
  onClickConnect(): void
}

const MetamaskLogin = ({ onClickConnect }: MetamaskLoginProps) => {
  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <Button sx={{ maxWidth: 200, mt: 5 }} variant="quartiary" onClick={onClickConnect}>
        Sign in with
        <Image
          sx={{ width: 35, height: 35 }}
          ml={3}
          src="https://docs.metamask.io/metamask-fox.svg"
        />
      </Button>
    </Flex>
  )
}

export { MetamaskLogin }
