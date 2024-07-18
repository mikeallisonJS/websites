import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isUserRoute = createRouteMatcher(['/user/(.*)'])
const isAdminRoute = createRouteMatcher(['/admin/(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isUserRoute(req)) auth().protect()
  if (isAdminRoute(req))
    auth().protect({
      role: 'admin'
    })
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', '/(!webhooks.*)']
}
