import { Story, Meta } from '@storybook/react/types-6-0'

import { ActivityLine, ActivityLineProps } from './ActivityLine'

export default {
  title: 'CHANGE ME/ActivityLine',
  component: ActivityLine,
  parameters: {
    layout: 'padded',
  },
} as Meta

const Template: Story<ActivityLineProps> = args => <ActivityLine {...args} />

export const Default = Template.bind({})
Default.args = {} as ActivityLineProps
