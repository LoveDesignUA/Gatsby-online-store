import React from "react"
import { graphql, Link } from "gatsby"

// Assets
import cs from "./styles.module.scss"

// Components
import Layout from "../../components/layout"
import CollectionPreview from "../../components/collection-preview"
import Breadcrumbs from "../../components/breadcrumbs"

// Main component
const Collections = ({ data, location }) => {
  const {
    allContentfulCollections: { collections },
  } = data

  const breadcrumbs = [
    {
      title: collections[0].collectionReference.categoryName,
      link: null,
    },
  ]

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={cs.collectionsOverview}>
        {collections.map(({ id, slug, collectionName, product }) => {
          const path = `${location.pathname}/${slug}`

          if (product === null) return null

          {
            /* const productsForPreview = product.filter((product, i) => i < 4) */
          }

          return (
            <section key={id}>
              <h2>
                <Link to={path}>{collectionName}</Link>
              </h2>
              <CollectionPreview path={path} products={product} />
              {/* <CollectionPreview products={product} /> */}
            </section>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getCollectionsForCategory($slug: String!) {
    allContentfulCollections(
      filter: { collectionReference: { slug: { eq: $slug } } }
    ) {
      collections: nodes {
        collectionReference {
          categoryName
        }
        product {
          id
          categoryReference {
            slug
          }
          productReference {
            slug
          }
          slug
          productPrice
          productName
          isBestSellingProduct
          createdAt
          productDiscount
          productImages {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
        collectionName
        id
        slug
      }
    }
  }
`

export default Collections
