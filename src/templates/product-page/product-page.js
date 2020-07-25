import React, { useState, useEffect, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import classNames from "classnames/bind"

// Assets
import cs from "./styles.module.scss"

// Context and Actions
import { CartContext } from "../../context/cart/cartContext"
import { addItemToCart, setCartStage } from "../../context/cart/cartActions"

// Components
import Layout from "../../components/layout"
import AnimatedArrows from "../../components/animated-arrows"
import CustomButton from "../../components/button"
import RippleButton from "../../components/button/ripple-button"
import Notification from "../../components/notification"
import Breadcrumbs from "../../components/breadcrumbs"

const cx = classNames.bind(cs)

const SizeCheckbox = ({ size, choosenProductSize, onClick }) => {
  return (
    <button
      className={cx("sizeCheckbox", { active: choosenProductSize === size })}
      onClick={onClick}
    >
      {size}
    </button>
  )
}

// Main component
const ProductPage = ({ data }) => {
  const [choosenProductSize, setProductSize] = useState(null)
  const [showNotification, setShowNotification] = useState(false)

  const { dispatch } = useContext(CartContext)

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShowNotification(false)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [showNotification])

  const {
    contentfulProduct: {
      productReference: { slug: collectionSlug, collectionName },
      categoryReference: { categoryName, slug: categorySlug },
      id,
      productSizes,
      brandReference: { brandName },
      productName,
      productPrice,
      productDescription: { productDescription },
      productImages,
    },
  } = data

  const onAddToCartHandler = () => {
    if (productSizes && !choosenProductSize) {
      setProductSize(false)
      return
    }

    const productToAdd = {
      id: `${id}-${choosenProductSize}`,
      productName,
      productPrice,
      productImage: productImages[0],
      productSize: choosenProductSize,
    }

    dispatch(addItemToCart(productToAdd))
    setProductSize(null)
    dispatch(setCartStage("cart"))

    setShowNotification(true)
  }

  const breadcrumbs = [
    {
      title: categoryName,
      link: `/shop/${categorySlug}`,
    },
    {
      title: collectionName,
      link: `/shop/${categorySlug}/${collectionSlug}`,
    },
  ]

  return (
    <Layout showFooter={false} padding={false}>
      <AnimatePresence>
        {showNotification && (
          <Notification>Товар добавлен в корзину</Notification>
        )}
      </AnimatePresence>

      <div className={cs.productPage}>
        <div className={cs.images}>
          <AnimatedArrows />

          {productImages.map(({ id, fluid }) => (
            <Image key={id} fluid={fluid} />
          ))}
        </div>

        <section>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <h2 className={cs.productTitle}>{productName}</h2>

          <div>Бренд: {brandName}</div>

          <h2 className={cs.productPrice}>
            {productPrice} <small>грн</small>
          </h2>

          <p>
            {productDescription} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Blanditiis at culpa reiciendis architecto suscipit
            ad? Officia aliquid earum sed animi dicta a quaerat suscipit
            quisquam rerum eaque nam veritatis quam, libero dignissimos neque
            dolorum necessitatibus voluptate illo totam porro tenetur! Neque
            autem dolorem fugiat rerum enim nesciunt officiis quidem quae?
          </p>

          {productSizes && (
            <motion.div
              initial={{ x: 0 }}
              animate={{
                x:
                  choosenProductSize === false
                    ? [0, -1, 2, -4, -4, 4, -4, 2, -1]
                    : 0,
                transition: {
                  ease: [0.36, 0.07, 0.19, 0.97],
                },
              }}
              className={cx("sizeTitle", {
                redSize: choosenProductSize === false,
              })}
            >
              Выберите размер
            </motion.div>
          )}

          <div className={cs.chooseSize}>
            {productSizes &&
              productSizes.map(size => (
                <SizeCheckbox
                  key={size}
                  size={size}
                  choosenProductSize={choosenProductSize}
                  onClick={() => setProductSize(size)}
                />
              ))}
          </div>

          {/* <CustomButton
            type="submit"
            onClickHandler={onAddToCartHandler}
            color="black"
          >
            Добавить в корзину
          </CustomButton> */}
          <RippleButton
            type="submit"
            onClickHandler={onAddToCartHandler}
            primary
          >
            Добавить в корзину
          </RippleButton>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProduct(
    $categorySlug: String!
    $collectionSlug: String!
    $productSlug: String!
  ) {
    contentfulProduct(
      categoryReference: { slug: { eq: $categorySlug } }
      productReference: { slug: { eq: $collectionSlug } }
      slug: { eq: $productSlug }
    ) {
      id
      productReference {
        slug
        collectionName
      }
      categoryReference {
        categoryName
        slug
      }
      productSizes
      brandReference {
        brandName
      }
      productName
      productPrice
      productDescription {
        productDescription
      }
      productImages {
        fluid(maxWidth: 400) {
          ...GatsbyContentfulFluid
        }
        id
      }
    }
  }
`

export default ProductPage
