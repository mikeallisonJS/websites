import './global.css'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ReactElement, ReactNode } from 'react'

import theme from './theme'

export const metadata = {
  title: 'SLTDNB'
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
