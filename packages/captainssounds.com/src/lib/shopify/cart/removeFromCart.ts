import { graphql } from 'gql.tada'

import { shopifyFetch } from '../shopifyFetch'
import type { ShopifyRemoveFromCartOperation } from '../types'

import cartFragment from './cartFragment'
import { reshapeCart } from './reshapeCart'

const removeFromCartMutation = graphql(
  `
    mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...cart
        }
      }
    }
  `,
  [cartFragment]
)

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  })

  return reshapeCart(res.body.data.cartLinesRemove.cart)
}
