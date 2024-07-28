import { eq } from 'drizzle-orm'
import omit from 'lodash/omit'
import type { z } from 'zod'
import { db, type schema } from '../../../../lib/drizzle'
import { download, product as productDb } from '../../../../lib/drizzle/schema'
import { type FormSchema, ProductForm } from './productForm'

export async function Product({
  productId,
  categories
}: {
  productId?: string
  categories: Pick<typeof schema.category.$inferSelect, 'id' | 'name'>[]
}) {
  const product =
    productId === undefined
      ? undefined
      : await db.query.product.findFirst({
          where: (product, { eq }) => eq(product.id, productId),
          with: {
            images: true,
            download: true
          }
        })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    'use server'

    console.log(data)

    if (product?.id) {
      await db
        .update(productDb)
        .set(omit(data, ['images', 'download']))
        .where(eq(productDb.id, product?.id))
    } else {
      await db.insert(productDb).values(omit(data, ['images', 'download']))
    }
    if (data.download?.url && product?.download?.url) {
      await db
        .update(download)
        .set(data.download)
        .where(eq(download.productId, product?.id))
    } else if (data.download && !product?.download) {
      await db.insert(download).values({
        id: data.id,
        ...data.download,
        productId: data.id
      })
    }
  }
  return (
    <ProductForm
      product={product}
      categories={categories}
      onSubmit={onSubmit}
    />
  )
}
