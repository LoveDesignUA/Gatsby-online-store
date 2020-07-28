import React from "react"

// Assets
import cs from "./styles.module.scss"

// Main component
const CustomInput = props => {
  return <input className={cs.customInput} {...props} />
}

export default CustomInput
