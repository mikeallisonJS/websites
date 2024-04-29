import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font/sans'
import { ReactNode, Suspense } from 'react'
// import Stripe from 'stripe'

import { Toaster } from '@websites/shared/react/components'

import Navbar from '../components/navbar'
import { CSPostHogProvider } from '../components/posthogProvider'
import CartProvider from '../lib/cartProvider'

import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

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
  icons: {
    icon: '/favicon.ico'
  }
}

export default async function RootLayout({
  children,
  footer
}: {
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en" className={`${GeistSans.variable} dark`}>
          <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
            <CartProvider>
              <Navbar />
              <Suspense>
                <main>{children}</main>
              </Suspense>
              {footer}
            </CartProvider>
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  )
}
