import { CSPostHogProvider } from '@mikeallisonjs/shared-react-components'
import { GeistSans } from 'geist/font/sans'

import type { ReactNode } from 'react'

import './global.css'

export const metadata = {
  title: 'SLTDNB'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <CSPostHogProvider>
      <html lang="en" className={GeistSans.variable}>
        <body className=" bg-neutral-800 text-white selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
          {children}
        </body>
      </html>
    </CSPostHogProvider>
  )
}
