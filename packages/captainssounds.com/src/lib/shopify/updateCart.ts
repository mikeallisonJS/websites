import { editCartItemsMutation } from './mutations/cart'
import { reshapeCart } from './reshapeCart'
import { shopifyFetch } from './shopifyFetch'
import { Cart, ShopifyUpdateCartOperation } from './types'

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
