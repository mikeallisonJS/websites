import { removeEdgesAndNodes } from '../removeEdgesAndNodes'
import type { Connection, Image } from '../types'

export const reshapeImages = (
  images: Connection<Image>,
  productTitle: string
) => {
  const flattened = removeEdgesAndNodes(images)

  return flattened.map((image: Image) => {
    const filenameMatch = image.url.match(/.*\/(.*)\..*/)
    const filename = filenameMatch ? filenameMatch[1] : ''
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    }
  })
}
