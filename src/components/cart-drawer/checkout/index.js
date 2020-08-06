import React, { useState, useEffect, useRef, useContext } from "react"
import { motion } from "framer-motion"

// Assets
import cs from "./style.module.scss"

// Context and Actions
import { CartContext } from "../../../context/cart/cartContext"
import {
  setCartStage,
  setFormSubmitStatus,
  clearCart,
} from "../../../context/cart/cartActions"

// Components
import CustomInput from "../../custom-input"
import RippleButton from "../../button/ripple-button"

const initialFormData = {
  ФИО: "",
  Телефон: "",
  Город: "",
  "Отделение Новой почты": "",
}

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

// Main component
const Checkout = () => {
  const {
    cartState: { cartItems, cartItemsCount, cartItemsTotalPrice },
    dispatch,
  } = useContext(CartContext)

  const [formData, setFormData] = useState(initialFormData)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef(null)

  useEffect(() => {
    if (!isSubmitting) return

    const cartItemsForEmail = cartItems.reduce((finalOrder, item) => {
      const productForEmail = {
        Товар: item.productName,
        Цена: item.productPrice,
        Количество: item.quantity,
        Размер: item.productSize,
      }

      return [...finalOrder, productForEmail]
    }, [])

    const form = formRef.current
    const data = new FormData(form)
    data.append("Заказ", JSON.stringify(cartItemsForEmail))
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        dispatch(setFormSubmitStatus("SUCCESS"))
        dispatch(setCartStage("complete"))
        dispatch(clearCart())
        setFormData(initialFormData)
        setIsSubmitting(false)
      } else {
        dispatch(setFormSubmitStatus("FAIL"))
        dispatch(setCartStage("complete"))
        setIsSubmitting(false)
      }
    }
    xhr.send(data)
  }, [isSubmitting])

  const onSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
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
        Выбран(о) {cartItemsCount} товар(а) на сумму {cartItemsTotalPrice}{" "}
        гривен
      </p>
      <form
        // name="checkout-form"
        action="https://formspree.io/mwkradpa"
        ref={formRef}
        name="cart-checkout-form"
        //action="/"
        method="POST"
        // data-netlify="true"
        // data-netlify-honeypot="bot-field"
        onSubmit={onSubmitHandler}
      >
        {/* <input type="hidden" name="form-name" value="checkout-form" />
        <input type="hidden" name="bot-field" /> */}
        <CustomInput
          type="text"
          minLength="8"
          required
          // name="fullName"
          name="ФИО"
          placeholder="Фамилия, имя, отчество"
          value={formData.fullName}
          onChange={onChangeHandler}
        />
        <fieldset>
          <CustomInput
            type="tel"
            // name="phoneNumber"
            name="Телефон"
            pattern="[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}"
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
          // name="city"
          name="Город"
          placeholder="Город"
          value={formData.city}
          onChange={onChangeHandler}
        />
        <CustomInput
          type="number"
          min="1"
          max="777"
          required
          // name="postOffice"
          name="Отделение Новой почты"
          placeholder="Отделение Новой почты"
          value={formData.postOffice}
          onChange={onChangeHandler}
        />
        <div className={cs.bottomPanel}>
          <RippleButton type="submit" secondary fullWidth>
            Подтвердить заказ
          </RippleButton>
        </div>
      </form>
    </motion.div>
  )
}

export default Checkout
