import { graphql } from 'gql.tada'

import { TAGS } from '../../constants'
import { removeEdgesAndNodes } from '../removeEdgesAndNodes'
import { shopifyFetch } from '../shopifyFetch'
import { ShopifyProductsOperation } from '../types'

import productFragment from './productFragment'
import { reshapeProducts } from './reshapeProducts'

const getProductsQuery = graphql(
  `
    query getProducts(
      $sortKey: ProductSortKeys
      $reverse: Boolean
      $query: String
    ) {
      products(
        sortKey: $sortKey
        reverse: $reverse
        query: $query
        first: 100
      ) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  `,
  [productFragment]
)

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string
  reverse?: boolean
  sortKey?: string
}) {
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
