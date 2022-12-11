import React from "react"
import ReactMarkDown from "react-markdown"
import { graphql } from "gatsby"

const Post = ({
  data: {
    strapi: { post },
  },
}) => {
  const content = post.locales[0]?.content
  return (
    <React.Fragment>
      <ReactMarkDown source={content}></ReactMarkDown>
    </React.Fragment>
  )
}

export const postQuery = graphql`
  query PostQuery($id: ID!, $locale: String) {
    strapi {
      post(id: $id) {
        id
        locales(where: { locale: { label: $locale } }) {
          title
          content
        }
      }
    }
  }
`

export default Post
