import { PageContainer } from 'packages/shared-react-components/react/components/src'
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
