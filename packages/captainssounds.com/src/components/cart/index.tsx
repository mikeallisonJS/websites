import { cookies } from 'next/headers'
import { ReactElement } from 'react'

import { getCart } from '../../lib/shopify'

import CartModal from './modal'

export default async function Cart(): Promise<ReactElement> {
  const cartId = cookies().get('cartId')?.value
  let cart

  if (cartId) {
    cart = await getCart(cartId)
  }

  return <CartModal cart={cart} />
}
