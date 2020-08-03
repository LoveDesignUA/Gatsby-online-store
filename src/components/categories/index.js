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
      allContentfulCategories(sort: { fields: id, order: DESC }) {
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
            <div className={cs.title}>
              <h3>{categoryName}</h3>
              <Link to={`/shop/${slug}`}>Посмотреть</Link>
            </div>
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
