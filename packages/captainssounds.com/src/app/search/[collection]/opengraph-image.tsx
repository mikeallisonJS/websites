import { ImageResponse } from 'next/og'

import OpengraphImage from '../../../components/opengraph-image'
import { getCollection } from '../../../lib/shopify'

export const runtime = 'edge'

export default async function Image({
  params
}: {
  params: { collection: string }
}): Promise<ImageResponse> {
  const collection = await getCollection(params.collection)
  const title = collection?.seo?.title || collection?.title

  return await OpengraphImage({ title })
}
