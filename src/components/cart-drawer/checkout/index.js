import React, { useState, useContext } from "react"
import { motion } from "framer-motion"

// Assets
import cs from "./style.module.scss"

// Context and Actions
import { CartContext } from "../../../context/cart/cartContext"
import {
  setCartStage,
  clearCart,
  toggleCartOpen,
} from "../../../context/cart/cartActions"

// Components
import CustomInput from "../../custom-input"
import CustomButton from "../../button"
import RippleButton from "../../button/ripple-button"

const initialFormData = {
  fullName: "",
  phoneNumber: "",
  city: "",
  postOffice: "",
}

// Main component
const Checkout = () => {
  const {
    cartState: { cartItemsCount, cartItemsTotalPrice },
    dispatch,
  } = useContext(CartContext)

  const [formData, setFormData] = useState(initialFormData)

  const clearCartHandler = () => {
    dispatch(toggleCartOpen())
    dispatch(clearCart())
    dispatch(setCartStage("cart"))
  }

  const onSubmitHandler = e => {
    e.preventDefault()

    dispatch(clearCart())
    setFormData(initialFormData)
    dispatch(toggleCartOpen())
    dispatch(setCartStage("cart"))
  }

  const onChangeHandler = ({ target: { name, value } }) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cs.checkOut}
    >
      <p>
        Выбрано {cartItemsCount} товар(а) на сумму {cartItemsTotalPrice} гривен{" "}
      </p>
      <form onSubmit={onSubmitHandler}>
        <CustomInput
          type="text"
          minLength="8"
          required
          name="fullName"
          placeholder="Фамилия, имя, отчество"
          value={formData.fullName}
          onChange={onChangeHandler}
        />
        <fieldset>
          <CustomInput
            type="tel"
            name="phoneNumber"
            pattern="[0-9]{3}[\s-][0-9]{3}[\s-][0-9]{2}[\s-][0-9]{2}"
            // pattern="+38(0[1-9]{2})-[0-9]{3}-[0-9]{2}-[0-9]{2})"
            required
            placeholder="Телефон"
            value={formData.phoneNumber}
            onChange={onChangeHandler}
          />
          <p>Формат телефона: 0xx-xxx-xx-xx</p>
        </fieldset>
        <CustomInput
          type="text"
          required
          minLength="3"
          name="city"
          placeholder="Город"
          value={formData.city}
          onChange={onChangeHandler}
        />
        <CustomInput
          type="number"
          min="1"
          max="777"
          required
          name="postOffice"
          placeholder="Отделение Новой почты"
          value={formData.postOffice}
          onChange={onChangeHandler}
        />
        {/* <CustomButton type="submit" color="green" fullWidth>
          Подтвердить заказ
        </CustomButton> */}
        <RippleButton type="submit" secondary fullWidth>
          Подтвердить заказ
        </RippleButton>
      </form>
    </motion.div>
  )
}

export default Checkout
