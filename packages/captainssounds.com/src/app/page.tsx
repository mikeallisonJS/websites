import { ReactElement, Suspense } from 'react'

import { Carousel } from '../components/carousel'
import Footer from '../components/footer'
import { ThreeItemGrid } from '../components/grid/threeItems'
import Collections from '../components/layout/search/collections'

export const runtime = 'edge'

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
}

export default async function HomePage(): Promise<ReactElement> {
  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <ThreeItemGrid />
        </div>
      </div>
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  )
}
