import React, { useState } from "react"
import classNames from "classnames/bind"

// Assets
import cs from "./styles.module.scss"

const cx = classNames.bind(cs)

// Main component
const Tabs = ({ children, bgColor }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label)

  return (
    <div className={cs.tabContainer}>
      <div className={cs.tabList}>
        {children.map(child => {
          const { label } = child.props

          return (
            <button
              className={cx("tabListItem", {
                tabListActive: activeTab === label,
              })}
              key={label}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className={cs.tabContent}>
        {children.map(child => {
          if (child.props.label !== activeTab) return null
          return child.props.children
        })}
      </div>
    </div>
  )
}

export default Tabs
