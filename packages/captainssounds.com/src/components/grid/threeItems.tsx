import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import Link from 'next/link'

import { schema } from '../../lib/drizzle'

import { GridTileImage } from './tile'

const db = drizzle(sql, { schema })

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: typeof schema.product.$inferSelect & {
    images: (typeof schema.image.$inferSelect)[]
  }
  size: 'full' | 'half'
  priority?: boolean
}) {
  return (
    <div
      className={
        size === 'full'
          ? 'md:col-span-4 md:row-span-2'
          : 'md:col-span-2 md:row-span-1'
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.id}`}
      >
        <GridTileImage
          src={item.images?.[0]?.url}
          fill
          sizes={
            size === 'full'
              ? '(min-width: 768px) 66vw, 100vw'
              : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name,
            amount: item.price.toString(),
            currencyCode: 'USD',
            donation: item.donationware
          }}
        />
      </Link>
    </div>
  )
}

export async function ThreeItemGrid() {
  const products = await db.query.product.findMany({
    where: (product, { ne }) => ne(product.categoryId, 'bonus'),
    with: { images: true },
    orderBy: (product, { asc }) => [asc(product.order)]
  })

  if (!products[0] || !products[1] || !products[2]) return null

  const [firstProduct, secondProduct, thirdProduct] = products

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  )
}
