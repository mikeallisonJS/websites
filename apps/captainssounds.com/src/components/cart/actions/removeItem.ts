'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { TAGS } from '../../../lib/constants'
import { removeFromCart } from '../../../lib/shopify'

export async function removeItem(_prevState: unknown, lineId: string) {
  const cartId = cookies().get('cartId')?.value

  if (!cartId) {
    return 'Missing cart ID'
  }

  try {
    await removeFromCart(cartId, [lineId])
    revalidateTag(TAGS.cart)
  } catch (_e) {
    return 'Error removing item from cart'
  }
}
