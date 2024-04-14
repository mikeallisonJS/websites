import { TAGS } from '../constants'

import { getProductsQuery } from './queries/product'
import { removeEdgesAndNodes } from './removeEdgesAndNodes'
import { reshapeProducts } from './reshapeProducts'
import { shopifyFetch } from './shopifyFetch'
import { Product, ShopifyProductsOperation } from './types'

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string
  reverse?: boolean
  sortKey?: string
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey
    }
  })

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products))
}
