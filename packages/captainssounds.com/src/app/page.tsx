import { ReactElement, Suspense } from 'react'

import { Carousel } from '../components/carousel'
import Footer from '../components/footer'
import { ThreeItemGrid } from '../components/grid/threeItems'

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
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  )
}
