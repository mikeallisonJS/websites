import Image from 'next/image'

import {
  PageContainer,
  PastEvents
} from '@mikeallisonjs/shared-react-components'

const images = [
  'sltdnb-24-1.png',
  'sltdnb-23-12.png',
  'sltdnb-23-9.png',
  'sltdnb-23-7.png',
  'sltdnb-23-5.png',
  'uv-23-2.png',
  'uv-23-1.png',
  'uv-22-12.png',
  'uv-22-9.png',
  'uv-22-8.png',
  'uv-22-7.png',
  'uv-22-5.png',
  'uv-22-4.png',
  'uv-22-3.png',
  'eventhorizon.jpeg',
  'uv-22-2.png',
  'uv-22-1.png',
  'uv-21-12.png',
  'welcomehome.png'
]

export default function Index() {
  return (
    <PageContainer>
      <Image
        src="/images/sltdnb-v.svg"
        alt="logo"
        id="logo"
        width={565}
        height={645}
        style={{ margin: 'auto' }}
        priority
      />
      <div className="mb-5 text-center text-4xl">
        South Lake Tahoe Drum & Bass
      </div>
      <PastEvents images={images} />
    </PageContainer>
  )
}
