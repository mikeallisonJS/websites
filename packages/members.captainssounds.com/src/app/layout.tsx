import './global.css'
import { ReactElement, ReactNode } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@websites/shared/react'
import { AuthProvider } from '../lib/auth/authProvider'
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'
import { Tokens, getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { User } from '../lib/auth/authContext'
import authConfig from '../lib/auth/authConfig'
import Header from '../components/header/header'

export const metadata = {
  title: 'SLTDNB'
}

const toUser = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider
  } = decodedToken

  const customClaims = filterStandardClaims(decodedToken)

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims
  }
}

export default async function RootLayout({
  children
}: {
  children: ReactNode
}): Promise<ReactElement> {
  const tokens = await getTokens(cookies(), authConfig)
  const user = tokens ? toUser(tokens) : null
  console.log('user', user)
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider user={user}>
              <Header />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
