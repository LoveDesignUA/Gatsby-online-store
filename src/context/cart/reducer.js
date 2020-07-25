import {
  addItem,
  removeItem,
  decreaseItemQuantity,
  getCartItemsCount,
  getCartItemsTotalPrice,
} from "./cartUtils"

import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  DECREASE_ITEM_QUANTITY_FROM_CART,
  TOGGLE_CART_OPEN,
  GET_CART_ITEMS_COUNT,
  GET_CART_ITEMS_TOTAL_PRICE,
  SET_CART_STAGE,
  CLEAR_CART,
} from "./cartActionTypes"

export default (state, { type, payload }) => {
  // console.log(state, type)

  switch (type) {
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      }

    case TOGGLE_CART_OPEN:
      return { ...state, isCartOpen: !state.isCartOpen }

    case SET_CART_STAGE:
      return {
        ...state,
        cartStage: payload,
      }

    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addItem(state.cartItems, payload),
      }

    case DECREASE_ITEM_QUANTITY_FROM_CART:
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, payload),
      }

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeItem(state.cartItems, payload),
      }

    case GET_CART_ITEMS_COUNT:
      return {
        ...state,
        cartItemsCount: getCartItemsCount(state.cartItems),
      }

    case GET_CART_ITEMS_TOTAL_PRICE:
      return {
        ...state,
        cartItemsTotalPrice: getCartItemsTotalPrice(state.cartItems),
      }

    default:
      return state
  }
}
