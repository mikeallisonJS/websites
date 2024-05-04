import { Arimo } from 'next/font/google'

import './global.css'
import { cn } from '@websites/shared/react/lib'

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
    <html lang="en" className={cn('dark scroll-smooth', arimo.variable)}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
