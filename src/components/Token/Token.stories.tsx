import { Story, Meta } from '@storybook/react/types-6-0'

import Token, { TokenCompProps } from './Token'

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
    price: '1000000000000000000',
    name: 'Token 1',
  },
  onTransfer: () => {},
  onBuy: undefined,
  onSale: undefined,
} as TokenCompProps
