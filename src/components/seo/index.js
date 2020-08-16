import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, article }) => {
  const { location } = useLocation()

  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          defaultDescription: description
          siteUrl
          defaultTitle: title
          titleTemplate
        }
      }
    }
  `)

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    // defaultImage,
    // twitterUsername,
  } = siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    // image: `${siteUrl}${image || defaultImage}`,
    // url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet
      htmlAttributes={{ lang: "ru" }}
      title={`${title} | ${defaultTitle}`}
    >
      <meta name="description" content={seo.description} />
      {/* <meta name="image" content={seo.image} /> */}
    </Helmet>
  )
}
export default SEO
