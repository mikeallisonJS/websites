interface ProductImage {
  url: string
  compressedName: string
}

export interface Product {
  id: string
  name: string
  description: string
  links: string[]
  images: ProductImage[]
}
