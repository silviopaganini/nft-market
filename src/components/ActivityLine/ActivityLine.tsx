import { Box, Text } from 'theme-ui'

export type ActivityHistory = {
  owner?: string
  name: string
  to?: string
  from?: string
  time: Date
}

export type ActivityLineProps = {
  activity: ActivityHistory
}

const ActivityLine = ({ activity }: ActivityLineProps) => {
  return (
    <Box sx={{ py: 3, px: 2, borderBottom: '1px solid', borderBottomColor: 'lightGray' }}>
      {activity.from && (
        <Text>
          <Text as="span" sx={{ fontWeight: 'bold', color: 'green' }}>
            {'>'}
          </Text>
          <Text as="span" ml={2}>
            Bought <b>{activity.name}</b> from <b>{activity.from}</b> at{' '}
            {activity.time.toLocaleDateString('en-GB')} -{' '}
            {activity.time.toLocaleTimeString('en-GB')}
          </Text>
        </Text>
      )}
      {activity.to && (
        <Text>
          <Text as="span" sx={{ fontWeight: 'bold', color: 'amber' }}>
            {'<'}
          </Text>
          <Text as="span" ml={2}>
            Sold <b>{activity.name}</b> to <b>{activity.to}</b> at{' '}
            {activity.time.toLocaleDateString('en-GB')} -{' '}
            {activity.time.toLocaleTimeString('en-GB')}
          </Text>
        </Text>
      )}
    </Box>
  )
}

export { ActivityLine }
