import type { ProductType } from '../app/product/[handle]/_products/type'

export const product: ProductType = {
  id: 'free-midi-racks',
  name: 'Free Midi Racks',
  description: 'Midi effect Racks',
  free: true,
  downloadId: null,
  donationware: false,
  stripeId: 'null',
  testStripeId: 'null',
  categoryId: 'racks',
  order: 24,
  price: 0,
  createdAt: '2024-04-29 04:52:25.008',
  images: [
    {
      url: '/assets/products/free-midi-box.png',
      altText: 'Free Midi Racks image'
    }
  ]
}
