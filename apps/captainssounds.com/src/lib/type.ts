export interface ProductType {
  id: string
  name: string
  description: string
  free: boolean
  downloadId: string | null
  donationware: boolean
  stripeId: string
  testStripeId: string
  categoryId: string
  order: number
  price: number
  createdAt: string
  images: Array<{
    url: string
    altText: string
  }>
}
