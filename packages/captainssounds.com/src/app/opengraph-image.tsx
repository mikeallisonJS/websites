import OpengraphImage from '../components/opengraph-image'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default async function Image(): Promise<ImageResponse> {
  return await OpengraphImage()
}
