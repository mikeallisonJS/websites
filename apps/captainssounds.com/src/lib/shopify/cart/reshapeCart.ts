import { removeEdgesAndNodes } from '../removeEdgesAndNodes'
import type { ShopifyCart } from '../types'

export const reshapeCart = (cart: ShopifyCart) => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    }
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  }
}
