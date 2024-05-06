import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import Link from 'next/link'

import { schema } from '../lib/drizzle'

import { GridTileImage } from './grid/tile'

const db = drizzle(sql, { schema })

export async function Carousel() {
  const products = await db.query.product.findMany({
    where: (product, { ne }) => ne(product.categoryId, 'bonus'),
    with: { images: true },
    orderBy: (product, { asc }) => [asc(product.order)]
  })

  if (!products?.length) return null

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products]

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="animate-carousel flex gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price.toString(),
                  currencyCode: 'USD',
                  donation: product.donationware
                }}
                src={product.images?.[0]?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
