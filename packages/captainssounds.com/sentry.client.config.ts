// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init } from '@sentry/nextjs'

init({
  dsn: 'https://55bf9e6de9a205417969a4cbc036783e@o4507117455015936.ingest.us.sentry.io/4507117457702912',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  // integrations: [
  //   Sentry.replayIntegration({
  //     // Additional Replay configuration goes in here, for example:
  //     maskAllText: true,
  //     blockAllMedia: true
  //   })
  // ]
})
