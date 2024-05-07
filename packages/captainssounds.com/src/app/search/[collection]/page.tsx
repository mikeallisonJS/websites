import { sql } from '@vercel/postgres'
import { OrderByOperators } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import Grid from '../../../components/grid'
import ProductGridItems from '../../../components/productGridItems'
import { schema } from '../../../lib/drizzle'

export const runtime = 'edge'

const db = drizzle(sql, { schema })

export async function generateMetadata({
  params
}: {
  params: { collection: string }
}) {
  const collection = await db.query.category.findFirst({
    where: (category, { eq }) => eq(category.id, params.collection)
  })

  if (!collection) return notFound()

  return {
    title: collection.name
    // description:
    //   collection.seo?.description ||
    //   collection.description ||
    //   `${collection.title} products`
  }
}

export const generateStaticParams = async () => {
  const categories = await db.query.category.findMany({
    where: (category, { eq }) => eq(category.inNavigation, true)
  })

  return categories.map((category) => ({
    collection: category.id
  }))
}

type CategoryPageProps = {
  params: { collection: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps): Promise<ReactElement> {
  const { sort } = searchParams as { [key: string]: string }

  // let orderBy = (product: typeof schema.product, { asc }: OrderByOperators) => [
  //   asc(product.order)
  // ]
  // switch (sort) {
  //   case 'price-asc':
  //     orderBy = (product, { asc }) => [asc(product.price)]
  //     break
  //   case 'price-desc':
  //     orderBy = (product, { desc }) => [desc(product.price)]
  //     break
  //   // case 'trending-desc':
  //   //   orderBy = (product, { count }) => [count(product.orders)]
  //   //   break
  //   case 'latest-desc':
  //     orderBy = (product, { desc }) => [desc(product.createdAt)]
  //     break
  // }

  const products = await db.query.product.findMany({
    where: (product, { eq, exists }) =>
      eq(product.categoryId, params.collection),
    with: { images: true },
    orderBy: (product, { asc, desc, sql }) => {
      switch (sort) {
        case 'price-asc':
          return [asc(product.price)]
        case 'price-desc':
          return [desc(product.price)]
        case 'trending-desc':
          return [
            desc(
              sql`SELECT COUNT(*) AS count, "productId" FROM "_OrderToProduct" GROUP BY "productId`
            )
          ]
        case 'latest-desc':
          return [desc(product.createdAt)]
        default:
          return [asc(product.order)]
      }
    }
  })

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  )
}
