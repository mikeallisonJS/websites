import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import Collections from '../../../components/collections'
import Footer from '../../../components/footer'
import { GridTileImage } from '../../../components/grid/tile'
import { Gallery } from '../../../components/product/gallery'
import { ProductDescription } from '../../../components/product/productDescription'
import { schema } from '../../../lib/drizzle'

export const runtime = 'edge'

const db = drizzle(sql, { schema })

export async function generateMetadata({
  params
}: {
  params: { handle: string }
}) {
  const product = await db.query.product.findFirst({
    where: (product, { eq }) => eq(product.id, params.handle),
    with: {
      images: true,
      blocks: true,
      category: { columns: { id: true } }
    }
  })

  if (!product) return notFound()

  const url = product.images[0]?.url ?? ''
  const indexable = product.category.id !== 'bonus'

  return {
    title: product.name,
    description: product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width: 390,
              height: 390,
              alt: product.name
            }
          ]
        }
      : null
  }
}

export default async function ProductPage({
  params
}: {
  params: { handle: string }
}) {
  const product = await db.query.product.findFirst({
    where: (product, { eq }) => eq(product.id, params.handle),
    with: {
      images: true,
      blocks: {
        orderBy: (block, { desc }) => [desc(block.order)]
      },
      category: { columns: { id: true } }
    }
  })

  if (!product) return notFound()

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0].url,
    offers: {
      '@type': 'AggregateOffer',
      availability: true
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.price.toString()
      // highPrice: product.priceRange.maxVariantPrice.amount,
      // lowPrice: product.priceRange.minVariantPrice.amount
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />

      {/* <div className="order-last min-h-screen w-full md:order-none"></div> */}
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div>
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
            <div className="h-full w-full basis-full lg:basis-1/2">
              <Suspense
                fallback={
                  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
                }
              >
                <Gallery
                  images={product.images.map(
                    (image: typeof schema.image.$inferSelect) => ({
                      src: image.url,
                      altText: product.name
                    })
                  )}
                />
              </Suspense>
            </div>

            <div className="basis-full lg:basis-1/2">
              <ProductDescription product={product} />
            </div>
          </div>
        </div>
      </div>
      <Suspense>
        <RelatedProducts id={product.id} categoryId={product.category.id} />
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  )
}

async function RelatedProducts({
  id,
  categoryId
}: {
  id: string
  categoryId: string
}) {
  const relatedProducts = await db.query.product.findMany({
    where: (product, { eq }) => eq(product.categoryId, categoryId),
    limit: 4,
    with: { images: true }
  })

  if (!relatedProducts.length) return null

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.id}`}
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price.toString(),
                  currencyCode: 'USD',
                  donation: product.donationware
                }}
                src={product.images[0]?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
