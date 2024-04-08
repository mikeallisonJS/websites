import { NextRequest } from 'next/server'
import { authMiddleware } from 'next-firebase-auth-edge'
import { NextResponse } from 'next/server'
import authConfig from '../lib/auth/authConfig'

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
