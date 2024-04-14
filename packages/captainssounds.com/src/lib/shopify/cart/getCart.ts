import { graphql } from 'gql.tada'

import { TAGS } from '../../constants'
import { shopifyFetch } from '../shopifyFetch'
import { Cart, ShopifyCartOperation } from '../types'

import cartFragment from './cartFragment'
import { reshapeCart } from './reshapeCart'

const getCartQuery = graphql(
  `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...cart
      }
    }
  `,
  [cartFragment]
)

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: 'no-store'
  })

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined
  }

  return reshapeCart(res.body.data.cart)
}
