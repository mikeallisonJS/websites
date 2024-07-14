import type { ProductType } from '../app/product/[handle]/_products/type'

export const product: ProductType = {
  id: 'sample-pack-1',
  name: 'Sample Pack 1',
  description: '100% Royalty Free original samples',
  free: true,
  downloadId: null,
  donationware: true,
  stripeId: 'price_1PA7LvJffSGieR0PwdYtoLyG',
  testStripeId: 'price_1PJXFQJffSGieR0PtB8URcEE',
  categoryId: 'sample-packs',
  order: 25,
  price: 5,
  createdAt: '2024-04-29 04:52:25.008',
  images: [
    {
      url: '/assets/products/samplepack1.png',
      altText: 'Sample Pack 1 image'
    }
  ]
}
