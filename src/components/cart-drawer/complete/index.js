import React, { useContext } from "react"
import { navigate } from "gatsby"

// Assets
import cs from "./styles.module.scss"
import ErrorIcon from "../../../images/svg/cart/error.svg"

// Context and Actions
import { CartContext } from "../../../context/cart/cartContext"
import { toggleCartOpen, setCartStage } from "../../../context/cart/cartActions"

// Components
import RippleButton from "../../button/ripple-button"

// Main component
const Completed = () => {
  const {
    cartState: { formSubmitResponse },
    dispatch,
  } = useContext(CartContext)

  const buttonHandler = () => {
    dispatch(toggleCartOpen())
    dispatch(setCartStage("cart"))
    setTimeout(() => {
      navigate("/")
    }, 1000)
  }

  return (
    <div className={cs.completed}>
      {formSubmitResponse === "SUCCESS" ? (
        <>
          <svg
            className={cs.checkmark}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className={cs.checkmark__circle}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className={cs.checkmark__check}
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <p>Ваш заказ принят и обрабатывается...</p>
        </>
      ) : (
        <div className={cs.fail}>
          <ErrorIcon />
          <p>
            Ошибка отправки формы заказа
            <br />
            Попробуйте повоторить позже
          </p>
        </div>
      )}
      <RippleButton primary fullWidth onClickHandler={buttonHandler}>
        Вернуться на главную
      </RippleButton>
    </div>
  )
}

export default Completed
