import { ImageResponse } from 'next/og'

import OpengraphImage from '../../components/opengraphImage'
import { getPage } from '../../lib/shopify'

export const runtime = 'edge'

export default async function Image({
  params
}: {
  params: { page: string }
}): Promise<ImageResponse> {
  const page = await getPage(params.page)
  const title = page.seo?.title || page.title

  return await OpengraphImage({ title })
}