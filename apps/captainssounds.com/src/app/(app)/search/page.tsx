import Grid from '../../../components/grid'
import ProductGridItems from '../../../components/productGridItems'
import { db } from '../../../lib/drizzle'

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
}

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string }

  const products = await db.query.product.findMany({
    where: (product, { ne }) => ne(product.categoryId, 'bonus'),
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
