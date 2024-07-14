import type { ProductType } from '../app/product/[handle]/_products/type'

export const product: ProductType = {
  id: 'filter-sweeper',
  name: 'Filter Sweeper',
  description:
    'A super simple way to handle multiple Ableton auto filters. Especially handy for automation. ',
  free: false,
  downloadId: null,
  donationware: true,
  stripeId: 'price_1PA6oWJffSGieR0PufQOKQGF',
  testStripeId: 'price_1PJXG3JffSGieR0PapwWgu4u',
  categoryId: 'racks',
  order: 3,
  price: 2,
  createdAt: '2024-04-29 04:52:25.008',
  images: [
    {
      url: '/assets/products/filter-sweeper-box.png',
      altText: 'Filter Sweeper image'
    }
  ]
}
