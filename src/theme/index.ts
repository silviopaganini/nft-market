import { SxStyleProp, Theme } from 'theme-ui'

const defaultButton = {
  border: 0,
  fontFamily: 'body',
  fontWeight: 'normal',
  lineHeight: 'body',
  fontSize: 2,
  paddingX: 3,
  paddingY: 2,
  outline: 'none',
  borderRadius: '7px',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'all 0.1s ease-out',
  '&:hover': {
    opacity: 0.7,
  },
} as SxStyleProp

export const Palette = {
  text: '#000',
  white: '#fff',
  background: '#F7F9FA',
  primary: '#111',
  secondary: '#222',
  gray: '#F7F9FA',
  lightGray: '#e0e0e0',
  midGray: '#333',
  lightBlue: '#EFF7FF',
  navy: '#333',
  green: '#333',
  amber: '#D58408',
  red: '#666',
  transparent: 'transparent',
  white20: 'rgba(255, 255, 255, .2)',
  black66: 'rgba(0, 0, 0, .66)',
}

export type PaletteKeys = keyof typeof Palette

export const Sizes = {
  header: 60,
  container: 1020,
  button: 250,
  logo: 60,
  sidemenu: 240,
  chart: 950,
}

export default {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 10, 16, 20, 30, 42, 56, 78, 125, 150],
  fontSizes: [10, 12, 16, 26, 36, 50, 75],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
  },
  layout: {
    container: {
      py: 4,
      px: 3,
    },
  },
  sizes: {
    ...Sizes,
  },
  cards: {
    nft: {
      borderRadius: '10px',
      bg: 'lightGray',
      border: '1px solid',
      borderColor: 'navy',
      m: 3,
      p: 3,
      textAlign: 'center',
    },
  },
  buttons: {
    primary: {
      ...defaultButton,
      fontWeight: 'bold',
      minWidth: 'button',
      bg: 'primary',
      color: 'white',
      textAlign: 'center',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 'button',
    },

    secondary: {
      variant: 'buttons.primary',
      bg: 'secondary',
      fontWeight: 'body',
    },
    tertiary: {
      variant: 'buttons.secondary',
      bg: 'navy',
      color: 'white',
      minWidth: 'auto',
    },
    quartiary: {
      variant: 'buttons.tertiary',
      bg: 'navy',
      color: 'white',
      minWidth: 'auto',
      py: 2,
    },
  },
  fontWeights: {
    heading: 300,
    body: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.333333333,
    heading: 1.066666667,
    subheading: 2,
  },
  colors: {
    ...Palette,
  },
  divider: {
    sideMenu: {
      bg: 'white20',
      color: 'white20',
      height: 1,
      my: 4,
    },
  },
  forms: {
    input: {
      paddingX: 2,
      paddingY: 2,
      borderRadius: '5px',
      bg: 'white',
      color: 'text',
    },
  },
  text: {
    body: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 1,
    },
    heading: {
      py: 2,
    },
    bold: {
      fontWeight: 'bold',
    },
    paragraph: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 2,
      fontSize: 2,
      letterSpacing: 0.44,
      color: 'white',
    },
    h1: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 6,
      letterSpacing: -0.44,
    },
    h2: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
      letterSpacing: -0.44,
    },
    h3: {
      fontFamily: 'heading',
      lineHeight: 'subheading',
      fontWeight: 'heading',
      fontSize: 3,
    },
    h4: {
      fontFamily: 'heading',
      lineHeight: 'subheading',
      fontWeight: 'bold',
      fontSize: 2,
    },
    h5: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 1.6,
      fontSize: 0,
      letterSpacing: 1.5,
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'inherit',
      },
    },
    hr: {
      height: 1,
      opacity: 0.5,
      bg: 'black',
      color: 'black',
      my: 6,
    },
  },
} as Theme
