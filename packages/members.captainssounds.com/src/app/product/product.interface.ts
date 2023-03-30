interface ProductImage {
  url: string
  compressedName: string
}

export interface Product {
  id: string
  name: string
  description: string
  images: ProductImage[]
  free: boolean
  purchaseUrl: string
}
