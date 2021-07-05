import { Story, Meta } from '@storybook/react/types-6-0'

import { Gallery, GalleryProps } from './Gallery'

export default {
  title: 'Views/Gallery',
  component: Gallery,
  parameters: {
    layout: 'padded',
  },
} as Meta

const Template: Story<GalleryProps> = args => <Gallery {...args} />

export const Default = Template.bind({})
Default.args = {} as GalleryProps
