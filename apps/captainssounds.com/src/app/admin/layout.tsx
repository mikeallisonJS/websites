import { ClerkProvider } from '@clerk/nextjs'
import { type ReactNode, Suspense } from 'react'

import { Toaster } from '@mikeallisonjs/shared-react-components'

import { Header } from './header'

import '../globals.css'

export const metadata = {
  title: "Captain's Sounds Admin",
  robots: {
    follow: false,
    index: false
  },
  icons: {
    icon: '/favicon.ico'
  }
}

export default async function RootLayout({
  children
}: {
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={'dark'}>
        <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
          <Header />
          <Suspense>
            <main>{children}</main>
          </Suspense>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
