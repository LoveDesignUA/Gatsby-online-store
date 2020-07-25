import React, { createContext, useReducer, useEffect } from "react"

// Actions
import { cartItemsCount, cartItemsTotalPrice } from "./cartActions"

// Reducer
import reducer from "./reducer"

const initialState = {
  isCartOpen: false,
  cartStage: "cart",
  cartItems: [],
  cartItemsCount: 0,
  cartItemsTotalPrice: 0,
}

const init = () => {
  const localCartItems = localStorage.getItem("cart items")

  return localCartItems
    ? { ...initialState, cartItems: JSON.parse(localCartItems) }
    : initialState
}

export const CartContext = createContext(initialState)

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initialState, init)

  useEffect(() => {
    dispatch(cartItemsCount())
    dispatch(cartItemsTotalPrice())

    localStorage.setItem("cart items", JSON.stringify(cartState.cartItems))
  }, [cartState.cartItems])

  const providerValue = { cartState, dispatch }

  return (
    <CartContext.Provider value={providerValue}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
