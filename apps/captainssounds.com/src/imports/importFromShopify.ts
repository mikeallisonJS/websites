import { resolve } from 'node:path'
import { getProducts } from '../lib/shopify'
import { writeFileSync } from 'node:fs'

async function importProductDescriptions() {
  const path = resolve('./src/lib/productHtml')
  const products = await getProducts({})
  for (const product of products) {
    writeFileSync(`${path}/${product.handle}.html`, product.descriptionHtml)
  }
}

async function main() {
  await importProductDescriptions()
}

void main()
