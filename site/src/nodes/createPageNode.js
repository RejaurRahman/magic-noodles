const createPageNode = (locale, helpers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { graphql, createPage } = helpers
      const {
        data: {
          strapi: { pages },
        },
      } = await graphql(`
        {
          strapi {
            pages {
              id
              slug
              locales(where: { locale: { label: "${locale}" } }) {
                title
                content
              }
            }
          }
        }
      `)

      pages.forEach(page => {
        createPage({
          path: `/${locale}/pages/${page.slug}`,
          component: require.resolve("../templates/page.js"),
          context: {
            id: page.id,
            locale,
          },
        })
      })

      resolve(helpers)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = createPageNode
