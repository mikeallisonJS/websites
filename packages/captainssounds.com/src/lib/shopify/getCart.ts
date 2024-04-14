import { TAGS } from '../constants'

import { getCartQuery } from './queries/cart'
import { reshapeCart } from './reshapeCart'
import { shopifyFetch } from './shopifyFetch'
import { Cart, ShopifyCartOperation } from './types'

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
