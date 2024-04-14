import { graphql } from 'gql.tada'

import { TAGS } from '../../constants'
import { shopifyFetch } from '../shopifyFetch'
import { Product, ShopifyProductRecommendationsOperation } from '../types'

import productFragment from './productFragment'
import { reshapeProducts } from './reshapeProducts'

const getProductRecommendationsQuery = graphql(
  `
    query getProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        ...product
      }
    }
  `,
  [productFragment]
)
export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId
    }
  })

  return reshapeProducts(res.body.data.productRecommendations)
}
