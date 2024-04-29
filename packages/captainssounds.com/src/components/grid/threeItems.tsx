import { Pool } from '@neondatabase/serverless'
import Link from 'next/link'

import { PrismaNeon } from '@prisma/adapter-neon'
import { Image, PrismaClient, Product } from '@prisma/client'

import { GridTileImage } from './tile'

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({
  adapter
})

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product & { images: Image[] }
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
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await prisma.product.findMany({
    where: {
      category: { id: { not: 'bonus' } }
    },
    include: { images: true, _count: { select: { orders: true } } },
    orderBy: { order: 'asc' }
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
