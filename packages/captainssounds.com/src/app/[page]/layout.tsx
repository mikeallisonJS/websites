import Footer from '../../components/layout/footer'
import { ReactElement, ReactNode, Suspense } from 'react'

export default function Layout({
  children
}: {
  children: ReactNode
}): ReactElement {
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
