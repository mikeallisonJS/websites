import { ShopifyCollection } from '../types'

import { reshapeCollection } from './reshapeCollection'

export const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = []

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection)

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection)
      }
    }
  }

  return reshapedCollections
}