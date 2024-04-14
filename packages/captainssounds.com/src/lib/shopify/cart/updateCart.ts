import { graphql } from 'gql.tada'

import { shopifyFetch } from '../shopifyFetch'
import { Cart, ShopifyUpdateCartOperation } from '../types'

import cartFragment from './cartFragment'
import { reshapeCart } from './reshapeCart'

const editCartItemsMutation = graphql(
  `
    mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...cart
        }
      }
    }
  `,
  [cartFragment]
)

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  })

  return reshapeCart(res.body.data.cartLinesUpdate.cart)
}
