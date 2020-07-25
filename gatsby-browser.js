import React from "react"
import CartProvider from "./src/context/cart/cartContext"

export const wrapRootElement = ({ element }) => (
  <CartProvider>{element}</CartProvider>
)
