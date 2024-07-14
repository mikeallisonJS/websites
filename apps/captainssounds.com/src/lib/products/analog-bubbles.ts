import type { ProductType } from '../app/product/[handle]/_products/type'

export const product: ProductType = {
  id: 'analog-bubbles',
  name: 'Analog Bubbles',
  description: 'Simple bubble synth created on Minibrute 2S',
  free: false,
  downloadId: null,
  donationware: false,
  stripeId: 'price_1PA6EhJffSGieR0PODRSDz19',
  testStripeId: 'price_1PJXG5JffSGieR0PDZbFZmIh',
  categoryId: 'instruments',
  order: 22,
  price: 2,
  createdAt: '2024-04-29 04:52:25.008',
  images: [
    {
      url: '/assets/products/mb2s-bubbles-box.png',
      altText: 'Analog Bubbles image'
    }
  ]
}
