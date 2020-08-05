import {
  TOGGLE_CART_OPEN,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  DECREASE_ITEM_QUANTITY_FROM_CART,
  GET_CART_ITEMS_COUNT,
  GET_CART_ITEMS_TOTAL_PRICE,
  SET_CART_STAGE,
  SET_FORM_SUBMIT_RESPONSE,
  CLEAR_CART,
} from "./cartActionTypes"

export const setFormSubmitStatus = status => ({
  type: SET_FORM_SUBMIT_RESPONSE,
  payload: status,
})

export const clearCart = () => ({
  type: CLEAR_CART,
})

export const toggleCartOpen = () => ({
  type: TOGGLE_CART_OPEN,
})

export const setCartStage = cartStage => ({
  type: SET_CART_STAGE,
  payload: cartStage,
})

export const addItemToCart = item => ({
  type: ADD_ITEM_TO_CART,
  payload: item,
})

export const removeItemFromCart = itemId => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: itemId,
})

// export const decreaseItemQuantityFromCart = itemId => ({
export const decreaseItemQuantityFromCart = itemToDecrease => ({
  type: DECREASE_ITEM_QUANTITY_FROM_CART,
  payload: itemToDecrease,
})

export const cartItemsCount = () => ({
  type: GET_CART_ITEMS_COUNT,
})

export const cartItemsTotalPrice = () => ({
  type: GET_CART_ITEMS_TOTAL_PRICE,
})
