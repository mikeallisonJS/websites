import type { init } from '@sentry/nextjs'

// `@sentry/nextjs` does not re-export the `DataCollection` type from
// `@sentry/core`, which is not a direct dependency here.
type DataCollection = NonNullable<Parameters<typeof init>[0]['dataCollection']>

/**
 * Sentry v11 replaced `sendDefaultPii` with `dataCollection`, and an unset
 * `dataCollection` collects everything (cookies, user info, request and
 * response bodies). This is the v10 default these apps ran with, per the
 * v10 to v11 migration guide.
 */
const PII_HEADER_DENYLIST = ['forwarded', '-ip', 'remote-', 'via', '-user']

export const dataCollection: DataCollection = {
  userInfo: false,
  cookies: false,
  httpHeaders: {
    request: { deny: PII_HEADER_DENYLIST },
    response: { deny: PII_HEADER_DENYLIST }
  },
  httpBodies: [],
  urlQueryParams: { deny: PII_HEADER_DENYLIST },
  genAI: { inputs: false, outputs: false },
  databaseQueryData: false,
  graphQL: { document: false, variables: false }
}
