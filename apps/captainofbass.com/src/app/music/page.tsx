import dynamic from 'next/dynamic'

import { PageContainer } from '@mikeallisonjs/shared-react-components'

const DynamicMusicClient = dynamic(() => import('./pageClient'), { ssr: false })
export default function Music() {
  return (
    <PageContainer>
      <DynamicMusicClient />
    </PageContainer>
  )
}
