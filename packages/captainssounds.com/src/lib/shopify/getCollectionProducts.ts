import { TAGS } from '../constants'

import { getCollectionProductsQuery } from './queries/collection'
import { removeEdgesAndNodes } from './removeEdgesAndNodes'
import { reshapeProducts } from './reshapeProducts'
import { shopifyFetch } from './shopifyFetch'
import { Product, ShopifyCollectionProductsOperation } from './types'

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string
  reverse?: boolean
  sortKey?: string
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  })

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``)
    return []
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products))
}
