import { Pool } from '@neondatabase/serverless'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { PrismaNeon } from '@prisma/adapter-neon'
import { Prisma, PrismaClient } from '@prisma/client'

import Grid from '../../../components/grid'
import ProductGridItems from '../../../components/productGridItems'

export const runtime = 'edge'

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({
  adapter
})

export async function generateMetadata({
  params
}: {
  params: { collection: string }
}) {
  const collection = await prisma.category.findUnique({
    where: { id: params.collection }
  })

  if (!collection) return notFound()

  return {
    title: collection.name
    // description:
    //   collection.seo?.description ||
    //   collection.description ||
    //   `${collection.title} products`
  }
}

export const generateStaticParams = async () => {
  const categories = await prisma.category.findMany({
    where: {
      inNavigation: true
    }
  })

  return categories.map((category) => ({
    collection: category.id
  }))
}

type CategoryPageProps = {
  params: { collection: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps): Promise<ReactElement> {
  const { sort } = searchParams as { [key: string]: string }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { order: 'asc' }
  switch (sort) {
    case 'price-asc':
      orderBy = { price: 'asc' }
      break
    case 'price-desc':
      orderBy = { price: 'desc' }
      break
    case 'trending-desc':
      orderBy = { orders: { _count: 'desc' } }
      break
    case 'latest-desc':
      orderBy = { createdAt: 'desc' }
      break
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: params.collection
    },
    include: { images: true, _count: { select: { orders: true } } },
    orderBy
  })

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  )
}
