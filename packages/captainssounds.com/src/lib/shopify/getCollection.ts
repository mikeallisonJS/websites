import { TAGS } from '../constants'

import { getCollectionQuery } from './queries/collection'
import { reshapeCollection } from './reshapeCollection'
import { shopifyFetch } from './shopifyFetch'
import { Collection, ShopifyCollectionOperation } from './types'

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  })

  return reshapeCollection(res.body.data.collection)
}
