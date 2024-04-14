import { graphql } from 'gql.tada'

import seoFragment from '../seoFragment'

export const collectionFragment = graphql(
  `
    fragment collection on Collection {
      handle
      title
      description
      seo {
        ...seo
      }
      updatedAt
    }
  `,
  [seoFragment]
)
