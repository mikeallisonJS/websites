import { Pool } from '@neondatabase/serverless'
import Link from 'next/link'

import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

import { GridTileImage } from './grid/tile'

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({
  adapter
})

export async function Carousel() {
  const products = await prisma.product.findMany({
    where: {
      category: { id: { not: 'bonus' } }
    },
    include: { images: true, _count: { select: { orders: true } } },
    orderBy: { order: 'asc' }
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
