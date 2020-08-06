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
const News = () => {
  const {
    allContentfulProduct: { nodes: products },
  } = useStaticQuery(graphql`
    {
      allContentfulProduct {
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
      title: "Новинки",
      link: null,
    },
  ]

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={cs.collectionPage}>
        <div className={cs.title}>
          <h2>Новинки</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={cs.collectionItems}
        >
          {products
            .filter(product => {
              // console.log(parseInt(product.createdAt.match(/\d+/g)))
              return parseInt(product.createdAt.match(/\d+/g)) < 26
            })
            .map(({ id, ...rest }) => (
              <CollectionItem key={id} {...rest} />
            ))}
        </motion.div>
      </div>
    </Layout>
  )
}

export default News
