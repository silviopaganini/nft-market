import { Story, Meta } from '@storybook/react/types-6-0'

import { Identicon, IdenticonProps } from './Identicon'

export default {
  title: 'Primitives/Identicon',
  component: Identicon,
  parameters: {
    layout: 'padded',
  },
} as Meta

const Template: Story<IdenticonProps> = args => <Identicon {...args} />

export const Default = Template.bind({})
Default.args = {
  address: '0x123Dasdas980sa8daza09sdxzasda091823',
} as IdenticonProps
