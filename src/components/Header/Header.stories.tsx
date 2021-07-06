import { Story, Meta } from '@storybook/react/types-6-0'

import { Header, HeaderProps } from './Header'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
} as Meta

const Template: Story<HeaderProps> = args => <Header {...args} />

export const Default = Template.bind({})
Default.args = {} as HeaderProps
