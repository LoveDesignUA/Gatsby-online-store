import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { motion } from "framer-motion"

// Assets
import cs from "./styles.module.scss"

// Components
import Layout from "../../components/layout"
import Breadcrumbs from "../../components/breadcrumbs"
import CollectionItem from "../../components/collection-item"

const containerVariants = {
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
  hidden: false,
}

// Main component
const BestSellers = () => {
  const {
    allContentfulProduct: { nodes: products },
  } = useStaticQuery(graphql`
    {
      allContentfulProduct(filter: { isBestSellingProduct: { eq: true } }) {
        nodes {
          id
          slug
          productPrice
          productName
          productImages {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          isBestSellingProduct
          productDiscount
          categoryReference {
            slug
          }
          productReference {
            slug
          }
          createdAt(fromNow: true)
        }
      }
    }
  `)

  const breadcrumbs = [
    {
      title: "Хиты продаж",
      link: null,
    },
  ]

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={cs.collectionPage}>
        <div className={cs.title}>
          <h2>Хиты продаж</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={cs.collectionItems}
        >
          {products.map(({ id, ...rest }) => (
            <CollectionItem key={id} {...rest} />
          ))}
        </motion.div>
      </div>
    </Layout>
  )
}

export default BestSellers
