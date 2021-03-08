import { Story, Meta } from '@storybook/react/types-6-0'

import Profile, { ProfileProps } from './Profile'

export default {
  title: 'Views/Profile',
  component: Profile,
  parameters: {
    layout: 'padded',
  },
} as Meta

const Template: Story<ProfileProps> = args => <Profile {...args} />

export const Default = Template.bind({})
Default.args = {} as ProfileProps
