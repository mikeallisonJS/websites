import { graphql } from 'gql.tada'

const seoFragment = graphql(`
  fragment seo on SEO {
    description
    title
  }
`)

export default seoFragment
