import { createCartMutation } from './mutations/cart'
import { reshapeCart } from './reshapeCart'
import { shopifyFetch } from './shopifyFetch'
import { Cart, ShopifyCreateCartOperation } from './types'

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  })

  return reshapeCart(res.body.data.cartCreate.cart)
}
