import { graphql } from 'gql.tada'

import productFragment from '../fragments/product'
import seoFragment from '../fragments/seo'

const collectionFragment = graphql(
  `
    fragment collection on Collection {
      handle
      title
      description
      seo {
        ...seo
      }
      updatedAt
    }
  `,
  [seoFragment]
)

export const getCollectionQuery = graphql(
  `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        ...collection
      }
    }
  `,
  [collectionFragment]
)

export const getCollectionsQuery = graphql(
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

export const getCollectionProductsQuery = graphql(
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
