import React from "react"
import { motion } from "framer-motion"
import { Link } from "gatsby"

// Assets
import cs from "./styles.module.scss"

// Components
import CollectionItem from "../collection-item"

const containerVariants = {
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
  hidden: false,
}

// Main component
const CollectionPreview = ({ products, path }) => {
  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={cs.collectionPreview}
      >
        {products
          .filter((item, i) => i < 4)
          .map(product => {
            return <CollectionItem key={product.id} {...product} path={path} />
          })}
      </motion.div>
      <div className={cs.showMore}>
        <div>
          <svg
            width="200px"
            height="48px"
            viewBox="0 0 200 48"
            className={cs.border}
          >
            {/* <polyline points="198,1 198,47 1,47 1,1 198,1" /> */}
            <rect
              x="2"
              y="2"
              width="196"
              height="44"
              rx="4"
              ry="4"
              stroke-linecap="round"
            />
          </svg>
          <Link to={path} className={cs.button}>
            <span>Показать все</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CollectionPreview
