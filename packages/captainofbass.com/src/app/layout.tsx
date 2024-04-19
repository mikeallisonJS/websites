import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

import Header from '../components/header/header'

import theme from './theme'

import './global.css'

const DynamicFooter = dynamic(() => import('../components/footer/footer'), {
  ssr: false
})
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
            {children}
            <DynamicFooter />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Captain',
  description:
    'Since the late 90s Mike Allison has been a staple in the Electronic Music scene as a DJ, producer, promoter and supporter. After 20+ years in the Southeast, he is now bringing his signature sounds to the West Coast under the name Captain. As a founder and resident of both SLTDNB and Ultraviolet, he has brought a new following and celebration of Drum and Bass to South Lake Tahoe.'
}
