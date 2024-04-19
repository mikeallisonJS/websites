import { PageContainer } from '@websites/shared/react/components'
import { Orders } from '../../../components/orders/orders'
import { Suspense } from 'react'

export default async function OrdersPage() {
  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Orders />
      </Suspense>
    </PageContainer>
  )
}
