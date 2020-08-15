require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://minimal-store.netlify.app`,
    title: `Украинский интернет-магазин кроссовок, одежды и аксессуаров`,
    description: `E-commerce Gatsby store`,
    author: `LoveDesignUA`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Интернет магазин Minimal`,
        short_name: `Minimal`,
        start_url: `https://minimal-store.netlify.app`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/svg/favicon/icon.svg`,
      },
    },
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "en",
      },
    },
    `gatsby-plugin-preact`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `13460080`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `PT Sans`,
            subsets: [`cyrillic`],
            variants: [`400`, `700`],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
