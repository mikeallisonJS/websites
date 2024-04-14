import { graphql } from 'gql.tada'

import seoFragment from '../fragments/seo'

const pageFragment = graphql(
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

export const getPageQuery = graphql(
  `
    query getPage($handle: String!) {
      pageByHandle(handle: $handle) {
        ...page
      }
    }
  `,
  [pageFragment]
)

export const getPagesQuery = graphql(
  `
    query getPages {
      pages(first: 100) {
        edges {
          node {
            ...page
          }
        }
      }
    }
  `,
  [pageFragment]
)
