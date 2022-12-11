import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Box from "../components/box"

import { ThemeProvider } from "styled-components"

import themes from "../theme"
import useThemeMode from "../hooks/useThemeMode"

const IndexPage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        strapi {
          home {
            id
            services {
              items {
                id
                title
                desc
                link
              }
            }
          }
        }
      }
    `
  )

  const {
    availableThemeModes,
    themeMode,
    themeConfig,
    changeThemeMode,
  } = useThemeMode({
    themes,
    initThemeMode: "light",
  })

  return (
    <ThemeProvider theme={themeConfig}>
      <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <pre>{JSON.stringify(data)}</pre>
        <pre>{JSON.stringify(availableThemeModes)}</pre>
        <Box color="default" bg="bgDefault">{`Demo Theme ${themeMode}`}</Box>
        <button onClick={() => changeThemeMode(availableThemeModes[0])}>
          Change
        </button>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </Layout>
    </ThemeProvider>
  )
}

export default IndexPage
