const path = require("path")

// Create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allContentfulCategories {
        nodes {
          slug
        }
      }

      allContentfulCollections {
        nodes {
          slug
          collectionReference {
            slug
          }
        }
      }

      allContentfulProduct {
        nodes {
          slug
          productReference {
            slug
            collectionReference {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allContentfulCategories.nodes.forEach(({ slug }) => {
    createPage({
      path: `/shop/${slug}`,
      component: path.resolve(
        `./src/templates/collections-overview/collectionsOverview.js`
      ),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug,
      },
    })
  })

  result.data.allContentfulCollections.nodes.forEach(
    ({ slug: collectionSlug, collectionReference: { slug: categorySlug } }) => {
      createPage({
        path: `/shop/${categorySlug}/${collectionSlug}`,
        component: path.resolve(
          `./src/templates/collection-page/collection-page.js`
        ),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          categorySlug,
          collectionSlug,
        },
      })
    }
  )

  result.data.allContentfulProduct.nodes.forEach(
    ({
      slug: productSlug,
      productReference: {
        slug: collectionSlug,
        collectionReference: { slug: categorySlug },
      },
    }) => {
      createPage({
        path: `/shop/${categorySlug}/${collectionSlug}/${productSlug}`,
        component: path.resolve(`./src/templates/product-page/product-page.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          productSlug,
          categorySlug,
          collectionSlug,
        },
      })
    }
  )
}
