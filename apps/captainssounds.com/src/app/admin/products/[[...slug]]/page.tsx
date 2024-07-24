import { Suspense } from 'react'
import { db } from '../../../../lib/drizzle'
import { Product } from './product'

import { Selector } from './selector'

export default async function Page({
  params: { slug }
}: { params: { slug?: string[] } }) {
  const categoryIndex = slug?.indexOf('category') ?? -1
  const categoryId = categoryIndex > -1 ? slug?.[categoryIndex + 1] : undefined
  const productIndex = slug?.indexOf('product') ?? -1
  const productId = productIndex > -1 ? slug?.[productIndex + 1] : undefined

  const categories = await db.query.category.findMany({
    columns: { id: true, name: true }
  })
  const products = await db.query.product.findMany({
    columns: { id: true, name: true, categoryId: true },
    where:
      categoryId === undefined
        ? undefined
        : (product, { eq }) => eq(product.categoryId, categoryId)
  })

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
      <div className="order-first w-full flex-none md:max-w-[200px]">
        <Selector
          categoryId={categoryId}
          categories={categories}
          products={products}
          productId={productId}
        />
      </div>
      <div className="order-last w-full md:order-none">
        <Suspense>
          <Product productId={productId} categories={categories} />
        </Suspense>
      </div>
    </div>
  )
}
