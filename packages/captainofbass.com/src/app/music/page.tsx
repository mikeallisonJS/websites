import { PageContainer } from '@websites/shared/react/components'
import dynamic from 'next/dynamic'

const DynamicMusicClient = dynamic(() => import('./pageClient'), { ssr: false })
export default function Music() {
  return (
    <PageContainer>
      <DynamicMusicClient />
    </PageContainer>
  )
}
