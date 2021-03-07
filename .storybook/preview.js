import { ThemeProvider } from 'theme-ui'
import theme from '../src/theme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
}

export const withThemeProvider = (Story, context) => (
  <ThemeProvider theme={theme}>
    <Story {...context} />
  </ThemeProvider>
)

export const decorators = [withThemeProvider]
