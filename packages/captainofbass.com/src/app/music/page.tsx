import dynamic from 'next/dynamic'

import { PageContainer } from '@mikeallisonjs/next-tailwind-shared-components/ui'

const DynamicMusicClient = dynamic(() => import('./pageClient'), { ssr: false })
export default function Music() {
  return (
    <PageContainer>
      <DynamicMusicClient />
    </PageContainer>
  )
}
