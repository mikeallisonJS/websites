import { graphql } from 'gql.tada'

import { TAGS } from '../../constants'
import { removeEdgesAndNodes } from '../removeEdgesAndNodes'
import { shopifyFetch } from '../shopifyFetch'
import {
  Collection,
  ShopifyCollection,
  ShopifyCollectionsOperation
} from '../types'

import { collectionFragment } from './collectionFragment'
import { reshapeCollections } from './reshapeCollections'

const getCollectionsQuery = graphql(
  `
    query getCollections {
      collections(first: 100, sortKey: TITLE) {
        edges {
          node {
            ...collection
          }
        }
      }
    }
  `,
  [collectionFragment]
)

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
