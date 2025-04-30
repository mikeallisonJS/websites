
import { CSPostHogProvider } from '@mikeallisonjs/shared-react-components'

import Footer from './_footer/footer'
import Header from './_header/header'

import type { ReactNode } from 'react'

import '@fortawesome/fontawesome-svg-core/styles.css'
import './global.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <CSPostHogProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </CSPostHogProvider>
  )
}

export const metadata = {
  title: 'Captain',
  description:
    'Since the late 90s Mike Allison has been a staple in the Electronic Music scene as a DJ, producer, promoter and supporter. After 20+ years in the Southeast, he is now bringing his signature sounds to the West Coast under the name Captain. As a founder and resident of both SLTDNB and Ultraviolet, he has brought a new following and celebration of Drum and Bass to South Lake Tahoe.'
}
