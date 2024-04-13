import { Carousel } from '../components/carousel'
import { ThreeItemGrid } from '../components/grid/three-items'
import Footer from '../components/layout/footer'
import { ReactElement, Suspense } from 'react'

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
