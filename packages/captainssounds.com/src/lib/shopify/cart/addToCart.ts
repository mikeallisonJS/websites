import { graphql } from 'gql.tada'

import { shopifyFetch } from '../shopifyFetch'
import { Cart, ShopifyAddToCartOperation } from '../types'

import cartFragment from './cartFragment'
import { reshapeCart } from './reshapeCart'

const addToCartMutation = graphql(
  `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...cart
        }
      }
    }
  `,
  [cartFragment]
)

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  })
  return reshapeCart(res.body.data.cartLinesAdd.cart)
}
