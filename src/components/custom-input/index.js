import React from "react"

// Assets
import cs from "./styles.module.scss"

// Main component
const CustomInput = props => {
  return (
    <div className={cs.customInput}>
      <input {...props} />
    </div>
  )
}

export default CustomInput
