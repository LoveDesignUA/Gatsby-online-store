import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { graphql } from "gatsby"

// Assets
import cs from "./styles.module.scss"

// Components
import Layout from "../../components/layout"
import CollectionItem from "../../components/collection-item"
import Filter from "../../components/collection-filter"
import Tabs from "../../components/tabs"
import FilterOpenedIcon from "../../images/svg/Collection/filter-opened.svg"
import FilterClosedIcon from "../../images/svg/Collection/filter-closed.svg"
import Breadcrumbs from "../../components/breadcrumbs"

const getAllProductsSizes = products => {
  const allProductSizes = products.reduce((result, currentProduct) => {
    return currentProduct.productSizes
      ? [...result, ...currentProduct.productSizes]
      : result
  }, [])

  // let set = new Set(allProductSizes)
  // return set

  const uniqueProductSizes = allProductSizes
    .filter((size, i) => allProductSizes.indexOf(size) === i)
    .sort((a, b) => parseInt(a) - parseInt(b))

  return uniqueProductSizes
}

const getAllProductBrands = products => {
  const allProductBrands = products.reduce((result, currentProduct) => {
    return currentProduct.brandReference
      ? [...result, currentProduct.brandReference.brandName]
      : result
  }, [])

  const uniqueProductBrands = allProductBrands
    .filter((brand, i) => allProductBrands.indexOf(brand) === i)
    .sort()

  return uniqueProductBrands
}

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
const CollectionPage = ({ data, location }) => {
  const {
    contentfulCollections: {
      collectionReference: { categoryName, slug: categorySlug },
      collectionName,
      product,
    },
  } = data

  const [showFilter, setShowFilter] = useState(false)
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions)

  const uniqueProductsSizes = useMemo(() => getAllProductsSizes(product), [
    product,
  ])

  const productsBrands = useMemo(() => getAllProductBrands(product), [product])

  const renderFilteredProducts = products => {
    return products.map(product => {
      return (
        <CollectionItem
          key={product.id}
          // path={location.pathname}
          {...product}
        />
      )
    })
  }

  const renderCollectionProducts = () => {
    const { sizes, brands } = filterOptions
    let filteredProducts = product

    if (sizes.length === 0 && brands.length === 0) {
      return renderFilteredProducts(filteredProducts)
    } else if (sizes.length > 0 && brands.length === 0) {
      filteredProducts = product.filter(({ productSizes }) => {
        return sizes.some(size =>
          productSizes !== null ? productSizes.includes(size) : false
        )
      })

      return renderFilteredProducts(filteredProducts)
    } else if (sizes.length === 0 && brands.length > 0) {
      filteredProducts = product.filter(({ brandReference: { brandName } }) => {
        return brands.some(filterBrand =>
          brandName !== null ? brandName === filterBrand : false
        )
      })

      return renderFilteredProducts(filteredProducts)
    } else {
      filteredProducts = product
        .filter(({ productSizes }) => {
          return sizes.some(size =>
            productSizes !== null ? productSizes.includes(size) : false
          )
        })
        .filter(({ brandReference: { brandName } }) => {
          return brands.some(filterBrand =>
            brandName !== null ? brandName === filterBrand : false
          )
        })

      return renderFilteredProducts(filteredProducts)
    }
  }

  const breadcrumbs = [
    {
      title: categoryName,
      link: `/shop/${categorySlug}`,
    },
    {
      title: collectionName,
      link: null,
    },
  ]

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={cs.collectionPage}>
        <div className={cs.title}>
          <h2>{collectionName}</h2>

          <div
            className={cs.filterIcon}
            onClick={() => setShowFilter(prevState => !prevState)}
          >
            {!showFilter && <span>Фильтры</span>}
            {showFilter ? (
              <button className={cs.filterOpened}>
                <FilterOpenedIcon />
              </button>
            ) : (
              <motion.button
                initial={{ scale: 1 }}
                animate={{ scale: 0.75 }}
                transition={{ yoyo: Infinity, duration: 0.8 }}
                className={cs.filterClosed}
              >
                <FilterClosedIcon />
              </motion.button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFilter && (
            <Filter
              uniqueProductSizes={uniqueProductsSizes}
              productsBrands={productsBrands}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />
          )}
        </AnimatePresence>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={cs.collectionItems}
        >
          {renderCollectionProducts()}
        </motion.div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleCollection($categorySlug: String!, $collectionSlug: String!) {
    contentfulCollections(
      slug: { eq: $collectionSlug }
      collectionReference: { slug: { eq: $categorySlug } }
    ) {
      collectionReference {
        categoryName
        slug
      }
      collectionName
      product {
        categoryReference {
          slug
        }
        productReference {
          slug
        }
        brandReference {
          brandName
        }
        slug
        productName
        productPrice
        productSizes
        id
        productImages {
          fluid {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`

export default CollectionPage
