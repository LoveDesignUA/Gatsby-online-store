import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import cx from "classnames"

// Assets
import cs from "./styles.module.scss"

// Components
import Tabs from "../tabs"
import Checkbox from "../custom-checkbox"

// Main component
const CollectionFilter = ({
  uniqueProductSizes,
  productsBrands,
  filterOptions,
  setFilterOptions,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: "auto",
        transition: { ease: "easeOut", duration: 0.3 },
      }}
      exit={{
        opacity: 0,
        height: 0,
        transition: { duration: 0.1 },
      }}
      className={cs.collectionFilter}
    >
      <Tabs>
        <div label="Размер">
          <div className={cs.filterContent}>
            {uniqueProductSizes.map(size => (
              <Checkbox
                key={`size ${size}`}
                label={size}
                filter="sizes"
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
              />
            ))}
          </div>
        </div>
        <div label="Бренд">
          <div className={cs.filterContent}>
            {productsBrands.map(brand => (
              <Checkbox
                key={`brand ${brand}`}
                label={brand}
                filter="brands"
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
              />
            ))}
          </div>
        </div>
        {/* <div label="Цена">
          Nothing to see here, this tab is <em>extinct</em>!
        </div> */}
      </Tabs>
    </motion.div>
  )
}

export default CollectionFilter
