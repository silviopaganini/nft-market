import React from 'react'
import { Image, Flex, Heading, Button } from 'theme-ui'

export type MetamaskLoginProps = {
  onClickConnect(): void
}

const MetamaskLogin = ({ onClickConnect }: MetamaskLoginProps) => {
  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <Heading as="h3" sx={{ textAlign: 'center' }}>
        Before we start, we need to connect to you Metamask account{' '}
      </Heading>

      <Button sx={{ maxWidth: 200, mt: 5 }} variant="primary" onClick={onClickConnect}>
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
