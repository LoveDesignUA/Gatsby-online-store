import React, { useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Context and Actions
import { CartContext } from "../../context/cart/cartContext"
import { toggleCartOpen, setCartStage } from "../../context/cart/cartActions"

// Assets
import cs from "./styles.module.scss"
import CloseIcon from "../../images/svg/cart/close.svg"
import ArrowIcon from "../../images/svg/cart/arrow-back.svg"

// Components
import CartItems from "./cart-items"
import CheckOut from "./checkout/index"
import Complete from "./complete"

// Main Component
const CartDrawer = () => {
  const {
    cartState: { isCartOpen, cartItemsCount, cartItemsTotalPrice, cartStage },
    dispatch,
  } = useContext(CartContext)

  const handleCloseCart = () => {
    dispatch(toggleCartOpen())
    // dispatch(setCartStage("cart"))
  }

  return (
    <motion.div
      className={cs.cartDrawer}
      initial={false}
      animate={false}
      exit={{ display: "none", transition: { delay: 0.5 } }}
      // style={{ display: isCartOpen ? "block" : "none" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isCartOpen ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className={cs.overlay}
        onClick={handleCloseCart}
      />
      <AnimatePresence>
        <motion.div
          className={cs.cart}
          initial={{ x: "100%" }}
          animate={{
            x: isCartOpen ? 0 : "100%",
            transition: { ease: "easeOut", duration: 0.3 },
          }}
          exit={{ x: "100%" }}
        >
          <div className={cs.cartHeader}>
            {cartStage === "checkout" ? (
              <button onClick={() => dispatch(setCartStage("cart"))}>
                <ArrowIcon />
                <span>Назад в корзину</span>
              </button>
            ) : (
              <button style={{ width: "48px" }}>
                <span>Корзина</span>
              </button>
            )}
            <button onClick={handleCloseCart}>
              <CloseIcon />
            </button>
          </div>
          <div className={cs.cartContent}>
            <section className={cs.cartStage}>
              {cartStage === "cart" && (
                <CartItems handleCloseCart={handleCloseCart} />
              )}
              {cartStage === "checkout" && <CheckOut />}
              {cartStage === "complete" && <Complete />}
            </section>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default CartDrawer
