import { PageContainer } from '@websites/shared/react'
import { ReactElement } from 'react'
import ProductPageClient from './pageClient'
import Firestore from '../../lib/firestore/firestore'

export default function ProductsPage(): ReactElement {
  return (
    <PageContainer>
      <Firestore>
        <ProductPageClient />
      </Firestore>
    </PageContainer>
  )
}
