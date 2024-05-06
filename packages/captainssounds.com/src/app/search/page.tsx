import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

import Grid from '../../components/grid'
import ProductGridItems from '../../components/productGridItems'
import { schema } from '../../lib/drizzle'

export const runtime = 'edge'

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
}

const db = drizzle(sql, { schema })

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string }
  let orderBy = (product: typeof schema.product, { asc }) => [
    asc(product.order)
  ]
  switch (sort) {
    case 'price-asc':
      orderBy = (product, { asc }) => [asc(product.price)]
      break
    case 'price-desc':
      orderBy = (product, { desc }) => [desc(product.price)]
      break
    case 'trending-desc':
      orderBy = (product, { count }) => [count(product.orders)]
      break
    case 'latest-desc':
      orderBy = (product, { desc }) => [desc(product.createdAt)]
      break
  }

  const products = await db.query.product.findMany({
    where: (category, { ne }) => ne(category.id, 'bonus'),
    with: {
      images: true,
      orders: {
        columns: {
          orderId: true
        }
      }
    },
    orderBy
  })
  const resultsText = products.length > 1 ? 'results' : 'result'

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  )
}
