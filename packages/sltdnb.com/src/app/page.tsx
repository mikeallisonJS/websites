import { PageContainer, PastEvents } from '@websites/shared/react'
import { ReactElement } from 'react'
import Image from 'next/image'
import Typography from '@mui/material/Typography'

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

export default function Index(): ReactElement {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
  return (
    <PageContainer>
      <Image
        src="/images/sltdnb-v.svg"
        alt="logo"
        id="logo"
        width={565}
        height={645}
        style={{ margin: 'auto' }}
      />
      <Typography variant="h4">South Lake Tahoe Drum & Bass</Typography>
      <PastEvents images={images} />
    </PageContainer>
  )
}