import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

import { getPages } from '../lib/shopify'
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
        url: `${baseUrl}/search/${collection.id}`,
        lastModified: new Date().toISOString()
      }))
    )
  const productsPromise = prisma.product
    .findMany({ where: { category: { id: { not: 'bonus' } } } })
    .then((products) =>
      products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: new Date().toISOString()
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
