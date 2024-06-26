import React, { useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "gatsby-image"

// Assets
import cs from "./styles.module.scss"
import PlusIcon from "../../../images/svg/cart/plus.svg"
import MinusIcon from "../../../images/svg/cart/minus.svg"
import RemoveIcon from "../../../images/svg/cart/remove.svg"

// Components
import RippleButton from "../../button/ripple-button"

// Context and Actions
import { CartContext } from "../../../context/cart/cartContext"
import {
  toggleCartOpen,
  setCartStage,
  addItemToCart,
  decreaseItemQuantityFromCart,
  removeItemFromCart,
} from "../../../context/cart/cartActions"

const containerVariants = {
  hidden: false,
  show: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.1 },
  show: {
    opacity: 1,
    scale: 1,
  },
}

// Main component
const CartItems = () => {
  const {
    cartState: { cartItems, cartItemsCount, cartItemsTotalPrice },
    dispatch,
  } = useContext(CartContext)

  const handleCartStage = () => {
    dispatch(setCartStage("checkout"))
  }

  const addItemQuantityHandler = (itemId, productSize) => {
    // Этот объект необходим для cartUtils.js при добавлении или обновлении элементов корзины
    // const itemIdObj = { id: itemId}
    const itemToAdd = { id: itemId, productSize }

    dispatch(addItemToCart(itemToAdd))
  }

  const decreaseItemQuantityHandler = itemId => {
    dispatch(decreaseItemQuantityFromCart(itemId))
  }

  const removeItemFromCartHandler = itemId => {
    dispatch(removeItemFromCart(itemId))
  }

  return (
    <div className={cs.cartStage}>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={cs.cartItems}
      >
        {cartItemsCount ? (
          cartItems.map(
            ({
              id,
              productImage,
              productName,
              productPrice,
              productSize,
              quantity,
            }) => {
              return (
                <motion.div
                  key={id}
                  variants={itemVariants}
                  className={cs.cartProduct}
                >
                  <div className={cs.productImage}>
                    <Image fluid={productImage.fluid} />
                  </div>

                  <div className={cs.productDetails}>
                    <div>{productName}</div>
                    <div>{productSize && `Размер ${productSize}`}</div>
                    <div>
                      {quantity} <span>x</span> {productPrice} грн
                    </div>
                  </div>

                  <div className={cs.itemQuantity}>
                    <div>
                      <button
                        onClick={() => addItemQuantityHandler(id, productSize)}
                      >
                        <PlusIcon />
                      </button>
                      <button onClick={() => decreaseItemQuantityHandler(id)}>
                        <MinusIcon />
                      </button>
                    </div>
                    <button onClick={() => removeItemFromCartHandler(id)}>
                      <RemoveIcon />
                    </button>
                  </div>
                </motion.div>
              )
            }
          )
        ) : (
          <p>Ни одного товара не выбрано</p>
        )}
      </motion.section>
      <section className={cs.bottomPanel}>
        {cartItemsCount ? (
          <div className={cs.cartItemsBottom}>
            <div className={cs.totalPrice}>
              Сумма к оплате: {cartItemsTotalPrice} грн
            </div>
            <RippleButton
              type="submit"
              secondary
              onClickHandler={handleCartStage}
            >
              Оформить заказ
            </RippleButton>
          </div>
        ) : (
          <div className={cs.cartItemsBottom}>
            <RippleButton
              type="submit"
              primary
              onClickHandler={() => dispatch(toggleCartOpen())}
            >
              Продолжить покупки
            </RippleButton>
          </div>
        )}
      </section>
    </div>
  )
}

export default CartItems
