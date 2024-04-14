import { graphql } from 'gql.tada'

import productFragment from '../fragments/product'

export const getProductQuery = graphql(
  `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        ...product
      }
    }
  `,
  [productFragment]
)

export const getProductsQuery = graphql(
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

export const getProductRecommendationsQuery = graphql(
  `
    query getProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        ...product
      }
    }
  `,
  [productFragment]
)
