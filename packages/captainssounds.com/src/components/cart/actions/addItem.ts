'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { TAGS } from '../../../lib/constants'
import { addToCart, createCart, getCart } from '../../../lib/shopify'

export async function addItem(
  _prevState: unknown,
  selectedVariantId: string | undefined
) {
  let cartId = cookies().get('cartId')?.value
  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let cart

  if (cartId) {
    cart = await getCart(cartId)
  }

  if (!cartId || !cart) {
    cart = await createCart()
    cartId = cart.id
    cookies().set('cartId', cartId)
  }

  if (!selectedVariantId) {
    return 'Missing product variant ID'
  }

  try {
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }])
    revalidateTag(TAGS.cart)
  } catch (_e) {
    return 'Error adding item to cart'
  }
}
