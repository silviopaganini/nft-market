import { Story, Meta } from '@storybook/react/types-6-0'

import { ContractDetails, ContractDetailsProps } from './ContractDetails'

export default {
  title: 'Views/ContractDetails',
  component: ContractDetails,
  parameters: {
    layout: 'padded',
  },
} as Meta

const Template: Story<ContractDetailsProps> = args => <ContractDetails {...args} />

export const Default = Template.bind({})
Default.args = {} as ContractDetailsProps
