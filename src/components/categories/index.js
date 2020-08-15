import React from "react"
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
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
              ...GatsbyContentfulFluid_withWebp
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
          <div
            className={cs.category}
            key={id}
            onClick={() => navigate(`/shop/${slug}`)}
          >
            <div className={cs.title}>
              <h3>{categoryName}</h3>
              <Link to={`/shop/${slug}`}>Посмотреть</Link>
            </div>
            <Image fluid={fluid} alt={categoryName} />
          </div>
        )
      )}
    </div>
  )
}

export default Categories
