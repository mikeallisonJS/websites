import { Suspense } from 'react'

import { Carousel } from '../../components/carousel'
import Collections from '../../components/collections'
import { ThreeItemGrid } from '../../components/grid/threeItems'

export const metadata = {
  openGraph: {
    type: 'website'
  }
}

export default async function HomePage() {
  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div>
        <div className="order-last w-full md:order-none">
          <ThreeItemGrid />
        </div>
      </div>
      <Suspense>
        <Carousel />
      </Suspense>
    </>
  )
}
