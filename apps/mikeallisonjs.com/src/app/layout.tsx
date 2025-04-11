import { Arimo } from 'next/font/google'

import './global.css'
import { CSPostHogProvider } from '@mikeallisonjs/shared-react-components'
import { cn } from '@mikeallisonjs/shared-react-components'

import Header from '../components/header'

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arimo'
})

export const metadata = {
  title: 'mikeallisonJS',
  description: `
  Over ${new Date().getFullYear() - 2000} years experience designing
  cutting edge software solutions for global industry leading
  businesses.`
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CSPostHogProvider>
      <html lang="en" className={cn('dark scroll-smooth', arimo.variable)}>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </CSPostHogProvider>
  )
}
