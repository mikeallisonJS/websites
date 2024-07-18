import { Suspense } from 'react'

import { cn } from '@mikeallisonjs/shared-react-lib'

import type { schema } from '../../lib/drizzle'
import { AddToCart } from '../cart/addToCart'
import Price from '../price'

export function ProductDescription({
  product
}: {
  product: typeof schema.product.$inferSelect & {
    images: (typeof schema.image.$inferSelect)[]
    blocks: (typeof schema.block.$inferSelect)[]
  }
}) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.price.toString()}
            currencyCode="USD"
            donation={product.donationware}
          />
        </div>
      </div>

      {product.blocks.map((block, blockIndex) => {
        switch (block.type) {
          case 'Text':
            return (
              <div key={block.id} className={cn('mb-6', block.className)}>
                {block.value}
              </div>
            )
          case 'List':
            return (
              <ul className={cn('mb-6', block.className)} key={block.id}>
                {block.value.split('|').map((item, index) => (
                  <li key={`${blockIndex}-${index}`}>{item}</li>
                ))}
              </ul>
            )
          case 'Youtube':
            return (
              <div key={block.id} className={cn('mb-6', block.className)}>
                <iframe
                  width="100%"
                  height={315}
                  src={`https://youtube.com/embed/${block.value}`}
                  title={product.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )
          default:
            return null
        }
      })}
      <Suspense fallback={null}>
        <AddToCart product={product} />
      </Suspense>
    </>
  )
}
