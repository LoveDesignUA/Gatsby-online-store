const React = require("react")
const CartProvider = require("./src/context/cart/cartContext").default

exports.wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>
}
