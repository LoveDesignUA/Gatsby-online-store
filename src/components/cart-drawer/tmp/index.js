import React, { useContext } from "react"
import Image from "gatsby-image"

// Assets
import cs from "./styles.module.scss"
import PlusIcon from "../../../images/svg/cart/plus.svg"
import MinusIcon from "../../../images/svg/cart/minus.svg"
import RemoveIcon from "../../../images/svg/cart/remove.svg"

// Context and Actions
import { CartContext } from "../../../context/cart/cartContext"
import {
  setCartStage,
  addItemToCart,
  decreaseItemQuantityFromCart,
  removeItemFromCart,
} from "../../../context/cart/cartActions"

// Main component
const CartItems = () => {
  const {
    cartState: { cartItems, cartItemsCount },
    dispatch,
  } = useContext(CartContext)

  const addItemQuantityHandler = itemId => {
    // Этот объект необходим для cartUtils.js при добавлении или обновлении элементов корзины
    const itemIdObj = { id: itemId }

    dispatch(addItemToCart(itemIdObj))
  }

  const decreaseItemQuantityHandler = itemId => {
    dispatch(decreaseItemQuantityFromCart(itemId))
  }

  const removeItemFromCartHandler = itemId => {
    dispatch(removeItemFromCart(itemId))
  }

  return (
    <section className={cs.cartItems}>
      {cartItemsCount ? (
        cartItems.map(
          ({ id, productImages, productName, productPrice, quantity }) => {
            return (
              <div key={id} className={cs.cartProduct}>
                <Image fluid={productImages[0].fluid} />

                <div className={cs.itemQuantity}>
                  <button onClick={() => addItemQuantityHandler(id)}>
                    <PlusIcon />
                  </button>
                  <button onClick={() => decreaseItemQuantityHandler(id)}>
                    <MinusIcon />
                  </button>
                  <button onClick={() => removeItemFromCartHandler(id)}>
                    <RemoveIcon />
                  </button>
                </div>

                <div className={cs.productDetails}>
                  <h3>{productName}</h3>
                  <h4>
                    {quantity} x {productPrice} UAH
                  </h4>
                </div>
              </div>
            )
          }
        )
      ) : (
        <p>Ни одного товара не выбрано</p>
      )}
      {/* {cartItemsCount ? (
        <button
          className={cs.btnGreen}
          onClick={() => dispatch(setCartStage("checkout"))}
        >
          Оформить заказ
        </button>
      ) : null} */}
    </section>
  )
}

export default CartItems
