import { graphql } from 'gql.tada'

import { TAGS } from '../../constants'
import { shopifyFetch } from '../shopifyFetch'
import { Collection, ShopifyCollectionOperation } from '../types'

import { collectionFragment } from './collectionFragment'
import { reshapeCollection } from './reshapeCollection'

const getCollectionQuery = graphql(
  `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        ...collection
      }
    }
  `,
  [collectionFragment]
)

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
