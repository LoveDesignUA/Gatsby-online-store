import React from "react"
import { Link } from "gatsby"

// Assets
import cs from "./styles.module.scss"

// Main component
const Breadcrumbs = ({ breadcrumbs }) => {
  // console.log(breadcrumbs)

  return (
    <div className={cs.breadcrumbs}>
      <Link to="/">Главная</Link>
      {breadcrumbs.map(({ title, link }) => {
        return link ? (
          <Link key={title} to={link}>
            {title}
          </Link>
        ) : (
          <div key={title}>{title}</div>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
