import { db } from '../lib/drizzle'
import { getProducts } from '../lib/shopify'
import { validateEnvironmentVariables } from '../lib/utils'

type Route = {
  url: string
  lastModified: string
}

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({
  adapter
})

export default async function sitemap() {
  validateEnvironmentVariables()

  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }))

  const collectionsPromise = db.query.category
    .findMany({
      where: (category, { eq }) => eq(category.inNavigation, true)
    })
    .then((collections) =>
      collections.map((collection) => ({
        url: `${baseUrl}/search/${collection.id}`,
        lastModified: new Date().toISOString()
      }))
    )

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt
    }))
  )

  let fetchedRoutes: Route[] = []

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise])
    ).flat()
  } catch (error) {
    throw JSON.stringify(error, null, 2)
  }

  return [...routesMap, ...fetchedRoutes]
}
