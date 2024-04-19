import { ReactNode, Suspense } from 'react'

import Footer from '../../components/footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <div className="w-full">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <Footer />
    </Suspense>
  )
}
