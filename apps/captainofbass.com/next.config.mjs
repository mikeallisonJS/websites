import { withSentryConfig } from '@sentry/nextjs/config'

const nextConfig = {
  cacheComponents: true,
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development'
  },
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/ph/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*'
      },
      {
        source: '/ph/:path*',
        destination: 'https://us.i.posthog.com/:path*'
      }
    ]
  }
}

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/build/
  org: 'captain-fs',
  project: 'captainofbass',

  // Suppresses source map uploading logs during build
  silent: true,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  webpack: {
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    treeshake: { removeDebugLogging: true },

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true
  }
})
