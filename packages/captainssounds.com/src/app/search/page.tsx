import Grid from '../../components/grid'
import ProductGridItems from '../../components/productGridItems'

export const runtime = 'edge'

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
  let orderBy: Prisma.ProductOrderByWithRelationInput = { order: 'asc' }
  switch (sort) {
    case 'price-asc':
      orderBy = { price: 'asc' }
      break
    case 'price-desc':
      orderBy = { price: 'desc' }
      break
    case 'trending-desc':
      orderBy = { orders: { _count: 'desc' } }
      break
    case 'latest-desc':
      orderBy = { createdAt: 'desc' }
      break
  }

  const products = await prisma.product.findMany({
    where: {
      category: { id: { not: 'bonus' } }
    },
    include: { images: true, _count: { select: { orders: true } } },
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
