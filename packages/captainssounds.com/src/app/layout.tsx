import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font'
import { ReactNode, Suspense } from 'react'

import Navbar from '../components/navbar'
import { ensureStartsWith } from '../lib/utils'

import './globals.css'

const { TWITTER_CREATOR, TWITTER_SITE } = process.env
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, '@')
  : undefined
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, 'https://')
  : undefined

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Captain's Sounds",
    template: `%s | "Captain's Sounds"`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
}

export default async function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.variable}>
        <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
          <Navbar />
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}
