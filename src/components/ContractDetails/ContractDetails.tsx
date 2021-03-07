import { Box, Heading, Grid, Text } from 'theme-ui'
import { useStateContext } from '../../state'
import { ContractPropsDetails } from '../../types'

export type ContractDetailsProps = {
  //
}

const ContractDetails = () => {
  const {
    state: { contract },
  } = useStateContext()
  return (
    <Box>
      <Heading as="h1">NFT Contract Details</Heading>
      <Grid my={3}>
        {contract &&
          Object.keys(contract.details).map(a => (
            <Text key={a}>
              {a}:{' '}
              <Text variant="text.bold" as="span">
                {contract.details[a as keyof ContractPropsDetails]}
              </Text>
            </Text>
          ))}
      </Grid>
    </Box>
  )
}

export default ContractDetails
