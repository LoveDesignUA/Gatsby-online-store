export const addItem = (cartItems, newItem) => {
  const existingCartItem = cartItems.find(
    // cartItem => cartItem.id === newItem.id
    cartItem =>
      cartItem.id === newItem.id && cartItem.productSize === newItem.productSize
  )

  if (existingCartItem) {
    return cartItems.map(cartItem => {
      if (cartItem.id === newItem.id) {
        return {
          ...cartItem,
          productSize: newItem.productSize,
          quantity: cartItem.quantity + 1,
        }
      }

      return cartItem
    })
  }

  return [...cartItems, { ...newItem, quantity: 1 }]
}

export const removeItem = (cartItems, itemId) => {
  return cartItems.filter(cartItem => cartItem.id !== itemId)
}

export const decreaseItemQuantity = (cartItems, itemId) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === itemId)

  if (existingCartItem.quantity > 1) {
    return cartItems.map(cartItem => {
      if (cartItem.id === itemId) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      }

      return cartItem
    })
  }

  return removeItem(cartItems, itemId)
}

export const getCartItemsCount = cartItems => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)
}

export const getCartItemsTotalPrice = cartItems => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity * item.productPrice
  }, 0)
}
