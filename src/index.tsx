import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'theme-ui'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import reportWebVitals from './reportWebVitals'
import { Root } from './layout'
import theme from './theme'

Sentry.init({
  dsn: '',
  integrations: [new Integrations.BrowserTracing()],
  enabled: process.env.NODE_ENV !== 'development',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
