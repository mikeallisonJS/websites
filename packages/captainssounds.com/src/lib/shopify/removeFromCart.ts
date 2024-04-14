import { removeFromCartMutation } from './mutations/cart'
import { reshapeCart } from './reshapeCart'
import { shopifyFetch } from './shopifyFetch'
import { Cart, ShopifyRemoveFromCartOperation } from './types'

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
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
