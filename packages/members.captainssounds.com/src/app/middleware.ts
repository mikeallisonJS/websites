import { NextRequest } from 'next/server'
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin
} from 'next-firebase-auth-edge'
import { NextResponse } from 'next/server'
import authConfig from '../lib/auth/authConfig'

const PUBLIC_PATHS = ['/register', '/login']

export async function middleware(request: NextRequest): Promise<NextResponse> {
  return authMiddleware(request, {
    ...authConfig,
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: false, // Set this to true on HTTPS environments
      sameSite: 'lax' as const,
      maxAge: 12 * 60 * 60 * 24 // twelve days
    },
    handleValidToken: async ({ token, decodedToken }, headers) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request)
      }

      return NextResponse.next({
        request: {
          headers
        }
      })
    },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason })

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS
      })
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error })

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS
      })
    }
  })
}

export const config = {
  matcher: [
    '/api/login',
    '/api/logout',
    '/',
    '/((?!_next|favicon.ico|api|.*\\.).*)'
  ]
}
