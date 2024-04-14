import { reshapeProduct } from './reshapeProduct'
import { Product, ShopifyProduct } from './types'

export const reshapeProducts = (products: ShopifyProduct[]): Product[] => {
  const reshapedProducts = []

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product)

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct)
      }
    }
  }

  return reshapedProducts
}
