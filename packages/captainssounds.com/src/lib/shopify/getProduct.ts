import { TAGS } from '../constants'

import { getProductQuery } from './queries/product'
import { reshapeProduct } from './reshapeProduct'
import { shopifyFetch } from './shopifyFetch'
import { Product, ShopifyProductOperation } from './types'

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  })

  return reshapeProduct(res.body.data.product, false)
}
