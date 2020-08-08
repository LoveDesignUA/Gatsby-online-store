import React, { useContext } from "react"

// Context and Actions
import { CartContext } from "../../context/cart/cartContext"
import { toggleCartOpen } from "../../context/cart/cartActions"

// Assets
import cs from "./style.module.scss"
import ShoppingCartIcon from "../../images/svg/header/shopping-bag.svg"

// Main component
const ShoppingBag = () => {
  const {
    cartState: { cartItemsCount },
    dispatch,
  } = useContext(CartContext)

  const handleToggleCart = () => {
    dispatch(toggleCartOpen())
  }

  return (
    <button className={cs.shoppingBag} onClick={handleToggleCart}>
      Корзина
      <span>{cartItemsCount}</span>
      <ShoppingCartIcon />
    </button>
  )
}

export default ShoppingBag
