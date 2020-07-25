import React from "react"
import classNames from "classnames/bind"
import { motion } from "framer-motion"

// Assets
import cs from "./styles.module.scss"
const cx = classNames.bind(cs)

// Main component
const CustomButton = ({
  children,
  color,
  fullWidth,
  onClickHandler,
  ...rest
}) => {
  const buttonStyles = cx("btn", color, {
    fullWidth: fullWidth,
  })
  // const buttonStyles = cx({
  //   btn: true,
  //   [color]: color,
  //   fullWidth,
  // })

  return (
    <motion.button
    
      // className={cx(cs.btn, cs[color], { [cs.fullWidth]: fullWidth })}
      className={buttonStyles}
      onClick={onClickHandler}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export default CustomButton
