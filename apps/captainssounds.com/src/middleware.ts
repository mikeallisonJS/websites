import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isUserRoute = createRouteMatcher(['/user/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { protect } = await auth()
  if (isUserRoute(req)) protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', '/(!webhooks.*)']
}
