import { Input, Label } from '@mikeallisonjs/shared-react-components'

import { db } from '../../../../lib/drizzle'

export async function Product({ productId }: { productId?: string }) {
  const product =
    productId === undefined
      ? undefined
      : await db.query.product.findFirst({
          where: (product, { eq }) => eq(product.id, productId)
        })
  return (
    <div>
      {product !== undefined ? (
        <form>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={product.name} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" defaultValue={product.description ?? ''} />
          </div>
        </form>
      ) : null}
    </div>
  )
}
