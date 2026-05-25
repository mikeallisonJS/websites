import { CSPostHogProvider } from '@mikeallisonjs/shared-react-components'
import { cn } from '@mikeallisonjs/ui/lib/utils'
import { Mona_Sans, JetBrains_Mono } from 'next/font/google'

import type { Metadata } from 'next'
import './global.css'

import { site } from '@/lib/site'

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.author} — ${site.jobTitle}`,
    template: `%s · ${site.name}`
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'Mike Allison',
    'software engineer',
    'staff engineer',
    'principal engineer',
    'full-stack developer',
    'portfolio',
    ...site.knowsAbout
  ],
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.author} — ${site.jobTitle}`,
    description: site.description,
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.author} — ${site.jobTitle}`,
    description: site.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
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
          {children}
        </body>
      </html>
    </CSPostHogProvider>
  )
}
