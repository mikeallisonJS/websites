import { graphql } from 'gql.tada'

const imageFragment = graphql(`
  fragment image on Image {
    url
    altText
    width
    height
  }
`)

export default imageFragment
