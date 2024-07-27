import { db, type schema } from '../../../../lib/drizzle'
import { ProductForm } from './productForm'

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
  return (
    <div>
      {product !== undefined ? (
        <ProductForm product={product} categories={categories} />
      ) : null}
    </div>
  )
}
