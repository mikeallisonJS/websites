import { CSPostHogProvider } from '@mikeallisonjs/shared-react-components'
import { cn } from '@mikeallisonjs/ui/lib/utils'
import { Mona_Sans, JetBrains_Mono } from 'next/font/google'
import './global.css'

import Header from '../components/header'

const monaSans = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mona-sans',
  weight: ['400', '500', '600', '700', '800']
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600']
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
      <html
        lang="en"
        className={cn(
          'dark scroll-smooth',
          monaSans.variable,
          jetBrainsMono.variable
        )}
      >
        <body>
          <Header />
          {children}
        </body>
      </html>
    </CSPostHogProvider>
  )
}
