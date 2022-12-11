const R = require("ramda")
const nodes = require("./src/nodes")

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    data: {
      strapi: { locales },
    },
  } = await graphql(`
    {
      strapi {
        locales {
          id
          label
        }
      }
    }
  `)

  const localizeNodes = locales.reduce((result, locale) => {
    const subNodes = nodes.map(node => {
      return R.partial(node, [locale.label])
    })
    return [...result, ...subNodes]
  }, [])

  const pipeR = R.pipeWith(R.andThen)
  const createNodes = pipeR(localizeNodes)

  await createNodes({
    graphql,
    createPage,
  })
}
