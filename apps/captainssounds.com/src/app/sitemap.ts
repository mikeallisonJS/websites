import { db } from '../lib/drizzle'

type Route = {
  url: string
  lastModified: string
}

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export default async function sitemap() {
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
  const productsPromise = db.query.product
    .findMany({ where: (product, { ne }) => ne(product.categoryId, 'bonus') })
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
