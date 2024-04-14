import { addToCartMutation } from "./mutations/cart";
import { reshapeCart } from "./reshapeCart";
import { shopifyFetch } from "./shopifyFetch";
import { Cart, ShopifyAddToCartOperation } from "./types";

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