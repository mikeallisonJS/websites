<<<<<<< HEAD
import { getCollections, getProducts } from '../lib/shopify'
=======
import { Pool } from '@neondatabase/serverless'

import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

import { getPages, getProducts } from '../lib/shopify'
>>>>>>> 81ee8d8 (migration to postgres calls)
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

  const collectionsPromise = prisma.category
    .findMany({
      where: { inNavigation: true }
    })
    .then((collections) =>
      collections.map((collection) => ({
        url: `${baseUrl}/search/${collection.id}`
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
