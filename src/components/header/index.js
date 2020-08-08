import React, { useState } from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"

// Assets
import cs from "./styles.module.scss"
import MenuIcon from "../../images/svg/header/menu.svg"

// Components
import ShoppingBag from "../shopping-bag"
import MobileMenu from "../mobile-menu"

const headerLinks = [
  { title: "Главная", linkTo: "/" },
  { title: "Мужчинам", linkTo: "/shop/men" },
  { title: "Женщинам", linkTo: "/shop/women" },
  { title: "Акции и скидки", linkTo: "/shop/sales" },
]

// Main component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className={cs.header}>
      <button className={cs.mobileMenu} onClick={() => setIsMenuOpen(true)}>
        Menu
        <MenuIcon />
      </button>

      <MobileMenu
        isMenuOpen={isMenuOpen}
        headerLinks={headerLinks}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className={cs.logo}>
        {pathname === "/" ? <span>LOGO</span> : <Link to="/">LOGO</Link>}
      </div>

      <div className={cs.headerLinks}>
        {headerLinks.map(({ linkTo, title }) => (
          <Link key={title} to={linkTo}>
            {title}
          </Link>
        ))}
      </div>

      <ShoppingBag />
    </header>
  )
}

export default Header
