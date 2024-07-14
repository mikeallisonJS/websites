import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { db } from '../lib/drizzle'
async function main() {
  await importProducts()
}

async function importProducts() {
  const path = resolve('./src/lib')
  const products = await db.query.product.findMany({
    where: (product, { ne }) => ne(product.categoryId, 'bonus'),
    with: { images: true }
  })
  for (const product of products) {
    const file = `
import type { ProductType } from '../type'

export const product: ProductType = {
  id: '${product.id}',
  name: '${product.name}',
  description: '${product.description?.replaceAll(`'`, `\\'`)}',
  free: ${product.free},
  downloadId: ${product.downloadId ? `'${product.downloadId}'` : 'null'},
  donationware: ${product.donationware},
  stripeId: '${product.stripeId}',
  testStripeId: '${product.testStripeId}',
  categoryId: '${product.categoryId}',
  order: ${product.order},
  price: ${Number.parseInt(product.price)},
  createdAt: '${product.createdAt}',
  images: ${
    product.images.length > 0
      ? `[
    ${product.images
      .map(
        (image) => `{
      url: '${image.url}',
      altText: '${product.name} image'
    }`
      )
      .join(',\n')}
  ]`
      : '[]'
  }
}
`
    writeFileSync(`${path}/products/${product.id}.ts`, file)
  }
  const file = `export const productIds = ['${products.map(({ id }) => id).join("', '")}']`
  writeFileSync(`${path}/productIds.ts`, file)
}

void main()
