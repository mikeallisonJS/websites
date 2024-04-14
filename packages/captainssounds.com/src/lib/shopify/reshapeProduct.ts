import { HIDDEN_PRODUCT_TAG } from '../constants'

import { removeEdgesAndNodes } from './removeEdgesAndNodes'
import { reshapeImages } from './reshapeImages'
import { Product, ShopifyProduct } from './types'

export const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts = true
): Product | undefined => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined
  }

  const { images, variants, ...rest } = product

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  }
}
