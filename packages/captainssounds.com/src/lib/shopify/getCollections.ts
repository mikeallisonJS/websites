import { TAGS } from '../constants'

import { getCollectionsQuery } from './queries/collection'
import { removeEdgesAndNodes } from './removeEdgesAndNodes'
import { reshapeCollections } from './reshapeCollections'
import { shopifyFetch } from './shopifyFetch'
import {
  Collection,
  ShopifyCollection,
  ShopifyCollectionsOperation
} from './types'

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections]
  })
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections)
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection: ShopifyCollection) => !collection.handle.startsWith('hidden')
    )
  ]

  return collections
}
