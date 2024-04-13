'use server'

import { TAGS } from '../../lib/constants'
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from '../../lib/shopify'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
): Promise<string | void> {
  let cartId = cookies().get('cartId')?.value
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
  } catch (e) {
    return 'Error adding item to cart'
  }
}

export async function removeItem(
  prevState: any,
  lineId: string
): Promise<string | void> {
  const cartId = cookies().get('cartId')?.value

  if (!cartId) {
    return 'Missing cart ID'
  }

  try {
    await removeFromCart(cartId, [lineId])
    revalidateTag(TAGS.cart)
  } catch (e) {
    return 'Error removing item from cart'
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string
    variantId: string
    quantity: number
  }
): Promise<string | void> {
  const cartId = cookies().get('cartId')?.value

  if (!cartId) {
    return 'Missing cart ID'
  }

  const { lineId, variantId, quantity } = payload

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId])
      revalidateTag(TAGS.cart)
      return
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ])
    revalidateTag(TAGS.cart)
  } catch (e) {
    return 'Error updating item quantity'
  }
}
