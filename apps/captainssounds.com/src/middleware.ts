import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isUserRoute = createRouteMatcher(['/user/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isUserRoute(req)) await auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', '/(!webhooks.*)']
}
