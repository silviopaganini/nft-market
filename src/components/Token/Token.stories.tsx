import { Story, Meta } from '@storybook/react/types-6-0'
import { BigNumber } from 'ethers'

import { Token, TokenCompProps } from './Token'

export default {
  title: 'Components/Token',
  component: Token,
  parameters: {
    layout: 'padded',
  },
} as Meta

const Template: Story<TokenCompProps> = args => <Token {...args} />

export const Default = Template.bind({})
Default.args = {
  token: {
    id: '1',
    uri: 'token1',
    price: BigNumber.from(1),
    name: 'Token 1',
  },
} as TokenCompProps
