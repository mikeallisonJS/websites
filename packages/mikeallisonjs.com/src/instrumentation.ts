import { init } from '@sentry/nextjs'

const dsn =
  'https://71c099987684ea04b0b3ad25c0ce36a2@o4507117455015936.ingest.us.sentry.io/4507201261273088'

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
