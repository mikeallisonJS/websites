import { notFound } from 'next/navigation'

import Grid from '../../../components/grid'
import ProductGridItems from '../../../components/productGridItems'
import { defaultSort, sorting } from '../../../lib/constants'
import { db } from '../../../lib/drizzle'
import { getCollectionProducts } from '../../../lib/shopify'

export const runtime = 'edge'

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
  }
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { sort } = searchParams as { [key: string]: string }
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse
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
