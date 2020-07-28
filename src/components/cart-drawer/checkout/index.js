import React, { useState, useEffect, useRef, useContext } from "react"
import { motion } from "framer-motion"
import { navigate } from "gatsby"

// Assets
import cs from "./style.module.scss"

// Context and Actions
import { CartContext } from "../../../context/cart/cartContext"
import { setCartStage, clearCart } from "../../../context/cart/cartActions"

// Components
import CustomInput from "../../custom-input"
import RippleButton from "../../button/ripple-button"

const initialFormData = {
  fullName: "",
  phoneNumber: "",
  city: "",
  postOffice: "",
}

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

// Main component
const Checkout = () => {
  const {
    cartState: { cartItemsCount, cartItemsTotalPrice },
    dispatch,
  } = useContext(CartContext)

  const [formData, setFormData] = useState(initialFormData)
  // const [isSubmitting, setIsSubmitting] = useState(false)

  // const formRef = useRef(null)

  // useEffect(() => {
  //   if (!isSubmitting) return

  //   fetch("/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: encode({
  //       "form-name": formRef.current.getAttribute("name"),
  //       ...formData,
  //     }),
  //   })
  //     .then(() => {
  //       dispatch(clearCart())
  //       setFormData(initialFormData)
  //       dispatch(setCartStage("complete"))
  //       setIsSubmitting(false)
  //     })
  //     .catch(error => {
  //       setIsSubmitting(false)
  //       console.log("here is " + error)
  //     })
  // }, [isSubmitting])

  const onSubmitHandler = e => {
    e.preventDefault()
    // setIsSubmitting(true)

    dispatch(clearCart())
    setFormData(initialFormData)
    dispatch(setCartStage("complete"))
    // setIsSubmitting(false)

    // const form = e.target
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
        Выбрано {cartItemsCount} товар(а) на сумму {cartItemsTotalPrice} гривен
      </p>
      <form
        // ref={formRef}
        // name="checkout-form"
        action="https://formspree.io/mwkradpa"
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
          name="fullName"
          placeholder="Фамилия, имя, отчество"
          value={formData.fullName}
          onChange={onChangeHandler}
        />
        <fieldset>
          <CustomInput
            type="tel"
            name="phoneNumber"
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
        <RippleButton type="submit" secondary fullWidth>
          Подтвердить заказ
        </RippleButton>
      </form>
    </motion.div>
  )
}

export default Checkout
