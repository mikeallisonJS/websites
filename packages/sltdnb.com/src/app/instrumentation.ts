import { init } from '@sentry/nextjs'

const dsn =
  'https://6419851e8c20157347014d51a7c6b208@o4507117455015936.ingest.us.sentry.io/4507117599391744'

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
