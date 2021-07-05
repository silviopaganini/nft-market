import { Story, Meta } from '@storybook/react/types-6-0'

import { MetamaskLogin, MetamaskLoginProps } from './MetamaskLogin'

export default {
  title: 'Views/MetamaskLogin',
  component: MetamaskLogin,
  parameters: {
    layout: 'padded',
  },
} as Meta

const Template: Story<MetamaskLoginProps> = args => <MetamaskLogin {...args} />

export const Default = Template.bind({})
Default.args = {} as MetamaskLoginProps
