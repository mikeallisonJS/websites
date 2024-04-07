import { PageContainer } from '@websites/shared/react'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const DynamicMusicClient = dynamic(() => import('./pageClient'), { ssr: false })
export default function Music(): ReactElement {
  return (
    <PageContainer>
      <DynamicMusicClient />
    </PageContainer>
  )
}
