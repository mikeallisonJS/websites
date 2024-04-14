import { graphql } from 'gql.tada'

import { TAGS } from '../../constants'
import productFragment from '../product/productFragment'
import { reshapeProducts } from '../product/reshapeProducts'
import { removeEdgesAndNodes } from '../removeEdgesAndNodes'
import { shopifyFetch } from '../shopifyFetch'
import { Product, ShopifyCollectionProductsOperation } from '../types'

const getCollectionProductsQuery = graphql(
  `
    query getCollectionProducts(
      $handle: String!
      $sortKey: ProductCollectionSortKeys
      $reverse: Boolean
    ) {
      collection(handle: $handle) {
        products(sortKey: $sortKey, reverse: $reverse, first: 100) {
          edges {
            node {
              ...product
            }
          }
        }
      }
    }
  `,
  [productFragment]
)

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
