import { ImageResponse } from 'next/og'

import OpengraphImage from '../components/opengraph-image'

export const runtime = 'edge'

export default async function Image(): Promise<ImageResponse> {
  return await OpengraphImage()
}
