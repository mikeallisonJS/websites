import { Suspense } from 'react'

import { PageContainer } from '@mikeallisonjs/next-tailwind-shared-components'

import { Orders } from '../../../components/orders/orders'

export default async function OrdersPage() {
  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Orders />
      </Suspense>
    </PageContainer>
  )
}
