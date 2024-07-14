import type { ProductType } from '../app/product/[handle]/_products/type'

export const product: ProductType = {
  id: 'fried-rattlesnake-sub',
  name: 'Fried Rattlesnake Sub',
  description:
    "Get that LOUD RATTLING sub sound you've been looking for, without vsts.",
  free: false,
  downloadId: null,
  donationware: true,
  stripeId: 'price_1PA6t5JffSGieR0PncjtOjcN',
  testStripeId: 'price_1PJXG2JffSGieR0PSzroTGta',
  categoryId: 'instruments',
  order: 15,
  price: 3,
  createdAt: '2024-04-29 04:52:25.008',
  images: [
    {
      url: '/assets/products/rattlesnake-sub-box.png',
      altText: 'Fried Rattlesnake Sub image'
    }
  ]
}
