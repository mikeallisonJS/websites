import { HIDDEN_PRODUCT_TAG } from '../../constants'
import { removeEdgesAndNodes } from '../removeEdgesAndNodes'
import { ShopifyProduct } from '../types'

import { reshapeImages } from './reshapeImages'

export const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts = true
) => {
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
