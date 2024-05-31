'use client'

import { captureException } from '@sentry/nextjs'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Error from 'next/error'
import { useEffect } from 'react'

export default function GlobalError(props: { error: unknown }) {
  useEffect(() => {
    captureException(props.error)
  }, [props.error])

  return (
    <html lang="en">
      <body>
        <Error statusCode={500} title="Error" />
      </body>
    </html>
  )
}
