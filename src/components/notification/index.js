import React from "react"
import { motion } from "framer-motion"

// Assets
import cs from "./styles.module.scss"

// Main component
const Notification = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={cs.notification}
    >
      {children}
    </motion.div>
  )
}

export default Notification
