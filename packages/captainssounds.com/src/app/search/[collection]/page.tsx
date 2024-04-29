import { notFound } from 'next/navigation'

import Grid from '../../../components/grid'
import ProductGridItems from '../../../components/productGridItems'
import { db } from '../../../lib/drizzle'

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
  const collection = await db.query.category.findFirst({
    where: (category, { eq }) => eq(category.id, params.collection)
  })

  if (!collection) return notFound()

  return {
    title: collection.name
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
}: CategoryPageProps) {
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
