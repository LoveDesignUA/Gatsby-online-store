import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

// Components
import Layout from "../components/layout"
import Categories from "../components/categories"
import CollectionPreview from "../components/collection-preview"
import Instagram from "../components/instagram"

const previewStyles = {
  paddingBottom: "3em",
  borderBottom: "1px solid #e3e3e3",
  marginBottom: "2em",
}

const h2Styles = {
  marginBottom: "1.5rem",
}

// Main component
const IndexPage = () => {
  const {
    allContentfulProduct: { nodes: products },
  } = useStaticQuery(graphql`
    {
      allContentfulProduct {
        nodes {
          id
          categoryReference {
            slug
          }
          productReference {
            slug
          }
          slug
          productPrice
          productName
          isBestSellingProduct
          createdAt(fromNow: true)
          productDiscount
          productImages {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  `)

  const renderBestSellingProducts = () => {
    return products.filter(product => {
      return product.isBestSellingProduct === true
    })
  }

  const renderDiscountProducts = () => {
    return products.filter(product => {
      return product.productDiscount > 0
    })
  }

  const renderNewProducts = () => {
    return products.filter(product => {
      // console.log(parseInt(product.createdAt.match(/\d+/g)))
      return parseInt(product.createdAt.match(/\d+/g)) < 30
    })
  }

  return (
    <Layout>
      <Categories />

      <section style={previewStyles}>
        <h2 style={h2Styles}>
          <Link to={"/shop/news"}>Новинки</Link>
        </h2>
        <CollectionPreview products={renderNewProducts()} path="/shop/news" />
      </section>

      <section style={previewStyles}>
        <h2 style={h2Styles}>
          <Link to={"/shop/bestsellers"}>Хиты продаж</Link>
        </h2>
        <CollectionPreview
          products={renderBestSellingProducts()}
          path="/shop/bestsellers"
        />
      </section>

      <section style={previewStyles}>
        <h2 style={h2Styles}>
          <Link to={"/shop/sale"}>Распродажа</Link>
        </h2>
        <CollectionPreview
          products={renderDiscountProducts()}
          path="/shop/sale"
        />
      </section>

      <Instagram />
    </Layout>
  )
}

export default IndexPage
