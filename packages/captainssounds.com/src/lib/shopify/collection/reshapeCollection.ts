import { ShopifyCollection } from '../types'

export const reshapeCollection = (collection: ShopifyCollection) => {
  if (!collection) {
    return undefined
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  }
}
