'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { TAGS } from '../../../lib/constants'
import { removeFromCart, updateCart } from '../../../lib/shopify'

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string
    variantId: string
    quantity: number
  }
) {
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
