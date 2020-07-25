import React from "react"
import cx from "classnames"

// Assets
import "./ripple.scss"

// Main component
const RippleButton = ({
  children,
  primary,
  secondary,
  fullWidth,
  onClickHandler,
}) => {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = React.useState(false)

  React.useEffect(() => {
    let timeout

    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      timeout = setTimeout(() => setIsRippling(false), 800)
    } else setIsRippling(false)

    return () => {
      clearTimeout(timeout)
    }
  }, [coords])

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 })
  }, [isRippling])

  const buttonStyles = cx(
    "rippleButton",
    { primary: primary },
    { secondary: secondary },
    {
      fullWidth: fullWidth,
    }
  )

  return (
    <button
      className={buttonStyles}
      onClick={e => {
        var rect = e.target.getBoundingClientRect()
        var x = e.clientX - rect.left
        var y = e.clientY - rect.top
        setCoords({ x, y })
        onClickHandler && onClickHandler(e)
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x + 10,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}
      <span className="content">{children}</span>
    </button>
  )
}

export default RippleButton
