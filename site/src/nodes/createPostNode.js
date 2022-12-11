const createPostNode = (locale, helpers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { graphql, createPage } = helpers

      const {
        data: {
          strapi: { posts },
        },
      } = await graphql(`
        {
          strapi {
            posts {
              id
              thumbnail {
                id
                url
              }
              created_at
              updated_at
              locales(where: { locale: { label: "${locale}" } }) {
                title
                content
              }
            }
          }
        }
      `)

      posts.forEach(post => {
        console.log(
          createPage({
            path: `/${locale}/posts/${post.id}`,
            component: require.resolve("../templates/post.js"),
            context: {
              id: post.id,
              locale,
            },
          })
        )
      })

      resolve(helpers)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = createPostNode
