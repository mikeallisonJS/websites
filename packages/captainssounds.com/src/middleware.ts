import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isUserRoute = createRouteMatcher(['/user/(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isUserRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', '/(!webhooks.*)']
}
