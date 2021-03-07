import { Box, Flex, Image, Container, Text, Link, Heading } from 'theme-ui'

const Error = () => {
  return (
    <Container>
      <Flex>
        <Image sx={{ width: 100, height: 100 }} src="/icons/icon-512x512.png" />
        <Box mt={4} ml={4}>
          <Heading as="h2">Metamask not installed</Heading>
          <Text mt={2}>
            Go to{' '}
            <Link href="https://metamask.io" target="_blank">
              https://metamask.io
            </Link>{' '}
            to install it.
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}

export default Error
