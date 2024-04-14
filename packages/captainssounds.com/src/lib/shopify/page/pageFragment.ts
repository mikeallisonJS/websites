import { graphql } from 'gql.tada'

import seoFragment from '../seoFragment'

export const pageFragment = graphql(
  `
    fragment page on Page {
      ... on Page {
        id
        title
        handle
        body
        bodySummary
        seo {
          ...seo
        }
        createdAt
        updatedAt
      }
    }
  `,
  [seoFragment]
)
