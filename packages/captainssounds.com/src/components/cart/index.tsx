import { cookies } from 'next/headers'

import { getCart } from '../../lib/shopify'

import CartModal from './modal'

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value
  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let cart

  if (cartId) {
    cart = await getCart(cartId)
  }

  return <CartModal cart={cart} />
}
