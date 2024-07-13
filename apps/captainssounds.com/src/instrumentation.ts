import { init } from '@sentry/nextjs'

const dsn =
  'https://55bf9e6de9a205417969a4cbc036783e@o4507117455015936.ingest.us.sentry.io/4507117457702912'

const baseConfig = {
  dsn,
  tracesSampleRate: 1,
  debug: false,
  enabled: process.env.NODE_ENV === 'production'
}
export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    init(baseConfig)
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    init(baseConfig)
  }
}
