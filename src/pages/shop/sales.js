import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

// Assets
import cs from "./styles.module.scss"

// Components
import Layout from "../../components/layout"
import Breadcrumbs from "../../components/breadcrumbs"
import CollectionItem from "../../components/collection-item"

const defaultFilterOptions = {
  sizes: [],
  brands: [],
  // price: 0
}

const containerVariants = {
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
  hidden: false,
}

// Main component
const Sale = () => {
  const {
    allContentfulProduct: { nodes: products },
  } = useStaticQuery(graphql`
    {
      allContentfulProduct(filter: { productDiscount: { gt: 0 } }) {
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
      title: "Распродажа",
      link: null,
    },
  ]

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={cs.collectionPage}>
        <div className={cs.title}>
          <h2>Распродажа</h2>
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

export default Sale
