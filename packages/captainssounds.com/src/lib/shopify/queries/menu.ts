import { graphql } from 'gql.tada'

export const getMenuQuery = graphql(`
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`)
