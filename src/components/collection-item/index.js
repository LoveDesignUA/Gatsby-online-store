import React, { useState, useEffect, useContext } from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import Image from "gatsby-image"

// Context and Actions
import { CartContext } from "../../context/cart/cartContext"

// Assets
import cs from "./styles.module.scss"
import AddItemToCartIcon from "../../images/svg/cart/add-product-to-cart.svg"

const itemVariants = {
  show: {
    opacity: 1,
    y: 0,
  },
  hidden: { opacity: 0, y: 20 },
}

const CollectionItem = product => {
  const {
    cartState: { isCartOpen },
    dispatch,
  } = useContext(CartContext)

  // Переключение изображения при наведении
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    setCurrentImage(0)
  }, [isCartOpen])

  const {
    categoryReference: { slug: categorySlug },
    productReference: { slug: collectionSlug },
    slug: productSlug,
    productPrice,
    productName,
    isBestSellingProduct,
    createdAt,
    productDiscount,
    productImages,
  } = product

  const path = `/shop/${categorySlug}/${collectionSlug}/${productSlug}`

  const onHoverHandler = e => {
    e.preventDefault()
    // e.stopPropagation()
    setCurrentImage(prevState => (prevState === 0 ? 1 : 0))
  }

  return (
    <motion.div variants={itemVariants} className={cs.collectionItem}>
      <div
        className={cs.imageWrapper}
        onMouseEnter={onHoverHandler}
        onMouseLeave={onHoverHandler}
      >
        <Image fluid={productImages[currentImage].fluid} alt={productName} />
      </div>

      <div className={cs.productInfo}>
        <div>
          {/* <Link className={cs.productLink} to={`${path}/${slug}`}> */}
          <Link className={cs.productLink} to={path}>
            {productName}
          </Link>
          <div className={cs.productPrice}>{productPrice} грн</div>
        </div>
      </div>
    </motion.div>
  )
}

export default CollectionItem
