import React, { useState } from "react"
import { motion } from "framer-motion"
import classNames from "classnames/bind"

// Assets
import cs from "./styles.module.scss"
import CheckmarkIcon from "../../images/svg/checkbox/checkmark.svg"

const cx = classNames.bind(cs)

// Main component
const CustomCheckbox = ({ label, filter, filterOptions, setFilterOptions }) => {
  const [isChecked, setIsChecked] = useState(() => {
    return filterOptions[filter].includes(label)
  })

  const checkboxHandler = label => {
    setIsChecked(prevState => !prevState)

    // If size is not checked
    !isChecked
      ? setFilterOptions(prevFilterOptions => {
          return {
            ...prevFilterOptions,
            [filter]: [...prevFilterOptions[filter], label],
          }
        })
      : setFilterOptions(prevFilterOptions => {
          return {
            ...prevFilterOptions,
            [filter]: prevFilterOptions[filter].filter(s => s !== label),
          }
        })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cx("customCheckbox", { active: isChecked })}
      onClick={() => checkboxHandler(label)}
    >
      <button>
        <CheckmarkIcon />
      </button>
      <span>{label}</span>
    </motion.div>
  )
}

export default CustomCheckbox
