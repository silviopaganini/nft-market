import { Box, Heading, Grid, Text } from 'theme-ui'
import { useAppState } from '../../state'
import { ContractPropsDetails } from '../../types'

export type ContractDetailsProps = {
  //
}

const ContractDetails = () => {
  const { contractDetails } = useAppState()
  return (
    <Box>
      <Heading as="h1">NFT Contract Details</Heading>
      <Grid my={3}>
        {contractDetails &&
          Object.keys(contractDetails).map(a => (
            <Text key={a}>
              {a}:{' '}
              <Text variant="text.bold" as="span">
                {contractDetails[a as keyof ContractPropsDetails]}
              </Text>
            </Text>
          ))}
      </Grid>
    </Box>
  )
}

export { ContractDetails }
