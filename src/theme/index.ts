import { SxProp, Theme } from 'theme-ui'

const defaultButton = {
  border: 0,
  fontFamily: 'body',
  fontWeight: 'normal',
  lineHeight: 'body',
  fontSize: [1, 2],
  paddingX: 3,
  paddingY: 2,
  outline: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'all 0.1s ease-out',
  '&:hover': {
    opacity: 0.7,
  },
} as SxProp

export const Palette = {
  text: '#FFF',
  white: '#fff',
  background: '#333',
  primary: '#111',
  secondary: '#333',
  gray: '#F7F9FA',
  lightGray: '#e0e0e0',
  midGray: '#222',
  lightBlue: '#EFF7FF',
  navy: '#e0e0e0',
  green: 'rgb(99, 255, 203)',
  amber: '#D58408',
  lightGreen: '#AEC',
  red: '#999',
  muted: '#999',
  transparent: 'transparent',
  white20: 'rgba(255, 255, 255, .2)',
  black66: 'rgba(0, 0, 0, .66)',
}

export type PaletteKeys = keyof typeof Palette

export const Sizes = {
  header: 60,
  container: 1020,
  button: [100, 250],
  logo: 60,
  sidemenu: 240,
  chart: 950,
}

export default {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 10, 16, 20, 30, 42, 56, 78, 125, 150],
  fontSizes: [10, 12, 16, 26, 36, 50, 75],
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading: 'inherit',
  },
  layout: {
    container: {
      py: 4,
      px: 3,
      pb: 10,
    },
  },
  sizes: {
    ...Sizes,
  },
  cards: {
    nft: {
      bg: 'background',
      border: '1px solid',
      borderColor: 'muted',
      textAlign: 'left',
    },
    transaction: {
      bg: 'amber',
      position: 'fixed',
      top: 50,
      right: 20,
      p: 4,
      borderRadius: 10,
    },
  },
  links: {
    nav: {
      color: 'white',
      cursor: 'pointer',
      transition: 'all .2s ease-out',
      '&:hover': {
        opacity: 0.5,
        color: 'white',
      },
    },
    openSea: {
      color: 'green',
      fontSize: 1,
      opacity: 0.5,
      '&:after': {
        content: `url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.262 0l2.529 2.524L0 6.314 1.685 8l3.79-3.79L8 6.732V0z' fill='rgb(99, 255, 203)' fill-rule='nonzero' /%3E%3C/svg%3E")`,
        ml: 1,
      },
      transition: 'all .2s ease-out',
      '&:hover': {
        opacity: 1,
        color: 'green',
      },
    },
    owner: {
      color: 'white',
      fontSize: 1,
      opacity: 0.5,
      transition: 'all .2s ease-out',
      '&:hover': {
        opacity: 1,
        color: 'white',
      },
      '&:after': {
        content: `url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.262 0l2.529 2.524L0 6.314 1.685 8l3.79-3.79L8 6.732V0z' fill='white' fill-rule='nonzero' /%3E%3C/svg%3E")`,
        ml: 1,
      },
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
    },

    secondary: {
      cursor: 'pointer',
      variant: 'buttons.primary',
      bg: 'secondary',
      fontWeight: 'body',
    },
    tertiary: {
      variant: 'buttons.secondary',
      color: 'white',
      bg: 'primary',
    },
    quartiary: {
      variant: 'buttons.tertiary',
      bg: 'green',
      color: 'black',
      minWidth: 'auto',
      py: 2,
    },
    filter: {
      variant: 'buttons.tertiary',
      bg: 'lightGreen',
      color: 'black',
      minWidth: 'auto',
      py: 1,
      fontSize: 1,
      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
    },
    connect: {
      variant: 'buttons.tertiary',
      py: 4,
      px: 5,
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
    nft: {
      color: 'muted',
      height: 1,
      my: 2,
    },
  },
  forms: {
    input: {
      paddingX: 2,
      paddingY: 2,
      borderRadius: '5px',
      bg: 'white',
      color: 'primary',
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
      fontSize: [1, 2],
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
