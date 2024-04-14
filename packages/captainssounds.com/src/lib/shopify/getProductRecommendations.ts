import { TAGS } from '../constants'

import { getProductRecommendationsQuery } from './queries/product'
import { reshapeProducts } from './reshapeProducts'
import { shopifyFetch } from './shopifyFetch'
import { Product, ShopifyProductRecommendationsOperation } from './types'

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
