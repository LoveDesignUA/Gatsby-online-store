import React from "react"
import { Link } from "gatsby"

// Assets
import cs from "./styles.module.scss"
import MenuIcon from "../../images/svg/header/menu.svg"

// Component
import ShoppingBag from "../shopping-bag"

const headerLinks = [
  { title: "Главная", linkTo: "/" },
  { title: "Мужчинам", linkTo: "/shop/men" },
  { title: "Женщинам", linkTo: "/shop/women" },
  { title: "Акции и скидки", linkTo: "/shop/sales" },
]

// Main component
const Header = () => {
  return (
    <header className={cs.header}>
      <button>
        <MenuIcon />
      </button>
      <div className={cs.headerLinks}>
        {headerLinks.map(({ linkTo, title }) => (
          <Link key={title} to={linkTo}>
            {title}
          </Link>
        ))}
      </div>
      {/* <Link to="/">Minimal</Link> */}
      <ShoppingBag />
    </header>
  )
}

export default Header
