import { graphql } from 'gql.tada'

import { TAGS } from '../../constants'
import { shopifyFetch } from '../shopifyFetch'
import { Product, ShopifyProductOperation } from '../types'

import productFragment from './productFragment'
import { reshapeProduct } from './reshapeProduct'

const getProductQuery = graphql(
  `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        ...product
      }
    }
  `,
  [productFragment]
)

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  })

  return reshapeProduct(res.body.data.product, false)
}
