import type { ProductType } from '../app/product/[handle]/_products/type'

export const product: ProductType = {
  id: 'arturia-spark',
  name: 'Arturia Spark Drum Rack',
  description:
    "Use Arturia's Spark vst just like an Ableton Drum Rack! Use your Push or 16pad controller to trigger any of the 16 pads instead of the 8 on hardware! Send Spark's audio out to 16 Ableton Channels",
  free: false,
  downloadId: null,
  donationware: false,
  stripeId: 'price_1PA6IvJffSGieR0PlU3x7OBE',
  testStripeId: 'price_1PJXG4JffSGieR0PE7UK4uUu',
  categoryId: 'templates',
  order: 18,
  price: 5,
  createdAt: '2024-04-29 04:52:25.008',
  images: [
    {
      url: '/assets/products/spark-box.png',
      altText: 'Arturia Spark Drum Rack image'
    }
  ]
}
