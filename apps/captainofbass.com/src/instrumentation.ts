import { init } from '@sentry/nextjs'

const dsn =
  'https://a0dc6d8f0544a8b4703ef87b50987276@o4507117455015936.ingest.us.sentry.io/4507117555875840'

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
