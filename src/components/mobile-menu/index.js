import React from "react"
import { Link } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

// Assets
import cs from "./styles.module.scss"

// Components
import FacebookIcon from "../../images/svg/footer/facebook.svg"
import InstagramIcon from "../../images/svg/footer/instagram.svg"
import TelegramIcon from "../../images/svg/footer/telegram.svg"
import YoutubeIcon from "../../images/svg/footer/youtube.svg"
import CloseIcon from "../../images/svg/cart/close.svg"

const containerVariants = {
  hidden: false,
  show: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
}

// Main component
const MobileMenu = ({ isMenuOpen, setIsMenuOpen, headerLinks }) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cs.mobileMenu}
        >
          <button className={cs.closeMenu} onClick={() => setIsMenuOpen(false)}>
            Закрыть
            <CloseIcon />
          </button>

          <Link className={cs.logo} to="/">
            LOGO
          </Link>

          <motion.div
            className={cs.menuLinks}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {headerLinks.map(({ linkTo, title }) => (
              <motion.div key={title} variants={itemVariants}>
                <Link to={linkTo}>
                  <span>{title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className={cs.socialLinks}>
            <a target="_blank" rel="noreferrer" href="https://instagram.com">
              Instagram
              <InstagramIcon />
            </a>
            <a target="_blank" rel="noreferrer" href="https://web.telegram.org">
              Telegram
              <TelegramIcon />
            </a>
            <a target="_blank" rel="noreferrer" href="https://facebook.com">
              Facebook
              <FacebookIcon />
            </a>
            <a target="_blank" rel="noreferrer" href="https://youtube.com">
              Youtube
              <YoutubeIcon />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
