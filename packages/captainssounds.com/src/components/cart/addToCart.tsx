'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { useShoppingCart } from 'use-shopping-cart'

import { cn } from '@websites/shared/react/lib'

import type { schema } from '../../lib/drizzle'

export function AddToCart({
  product
}: {
  product: typeof schema.product.$inferSelect & {
    blocks: (typeof schema.block.$inferSelect)[]
    images: (typeof schema.image.$inferSelect)[]
  }
}) {
  const { addItem } = useShoppingCart()

  const addToCart = () => {
    addItem({
      name: product.name,
      description: product.description ?? '',
      id:
        (process.env.NODE_ENV === 'production'
          ? product.stripeId
          : product.testStripeId) ?? '',
      price: Number(product.price) * 100,
      currency: 'USD',
      image: product.images[0].url
    })
  }
  return (
    <button
      type="button"
      onClick={addToCart}
      aria-label="Add to cart"
      className={cn(
        'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white',
        {
          'hover:opacity-90': true
        }
      )}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  )
}
