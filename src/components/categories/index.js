import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

// Assets
import cs from "./styles.module.scss"

// Main component
const Categories = () => {
  const {
    allContentfulCategories: { categories },
  } = useStaticQuery(graphql`
    {
      allContentfulCategories {
        categories: nodes {
          slug
          id
          categoryName
          categoryImage {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  `)

  return (
    <div className={cs.categories}>
      {categories.map(
        ({ id, categoryName, slug, categoryImage: { fluid } }) => (
          <div key={id}>
            <Link to={`/shop/${slug}`}>
              <Image fluid={fluid} alt={categoryName} />
            </Link>
          </div>
        )
      )}
    </div>
  )
}

export default Categories
