import React, { useContext } from "react"
import { AnimatePresence } from "framer-motion"
import cx from "classnames"

// Context and Actions
import { CartContext } from "../../context/cart/cartContext"

//Assets
import "./styles.scss"

// Components
import Header from "../header"
import Footer from "../footer"
import CartDrawer from "../cart-drawer"

// Main component
const Layout = ({ children, showHeader, showFooter, padding }) => {
  const {
    cartState: { isCartOpen },
  } = useContext(CartContext)

  return (
    <div
      className={cx({
        overlayLayout: isCartOpen,
      })}
    >
      {showHeader && <Header />}
      <main className={cx({ noPadding: !padding })}>{children}</main>
      {showFooter && <Footer />}
      <AnimatePresence>{isCartOpen && <CartDrawer />}</AnimatePresence>
    </div>
  )
}

Layout.defaultProps = {
  showHeader: true,
  showFooter: true,
  padding: true,
}

export default Layout
