import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"

// Assets
import footerLinks from "../../data/footer-links"
import cs from "./styles.module.scss"
import EmailIcon from "../../images/svg/footer/email.svg"
import FacebookIcon from "../../images/svg/footer/facebook.svg"
import InstagramIcon from "../../images/svg/footer/instagram.svg"
import ArrowRightIcon from "../../images/svg/footer/right-arrow.svg"
import TelegramIcon from "../../images/svg/footer/telegram.svg"
import YoutubeIcon from "../../images/svg/footer/youtube.svg"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

// Main component
const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef(null)

  useEffect(() => {
    if (!isSubmitting || !email) return

    const form = formRef.current
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        email,
      }),
    })
      .then(() => {
        // navigate(form.getAttribute("action"))
        setEmail("")
        setIsSubmitting(false)
      })
      .catch(error => {
        setIsSubmitting(false)
        alert(error)
      })

    return () => {
      setIsSubmitting(false)
    }
  }, [isSubmitting])

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
  }

  const handleChange = ({ target: { value } }) => {
    setEmail(value)
  }

  return (
    <footer className={cs.footer}>
      <Link to="/">M I N I M A L</Link>
      <p>
        Интернет-магазин крутых кроссовок,
        <br />
        стильной одежды и аксессуаров.
      </p>
      <nav>
        <ul>
          {footerLinks.map(({ id, name }) => (
            <li key={id}>
              <Link to="/">
                <span>{name}</span>
                <ArrowRightIcon />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>Подписка на акции и скидки</p>
      <form
        ref={formRef}
        name="subscribe"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="subscribe" />
        <input
          onChange={handleChange}
          value={email}
          type="email"
          name="email"
          placeholder="Ваш email"
          required
        />
        <button type="submit">Подписаться</button>
      </form>
      <hr />
      <div className={cs.social}>
        <ul>
          <li>
            <a target="_blank" href="/">
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a target="_blank" href="/">
              <TelegramIcon />
            </a>
          </li>
          <li>
            <a target="_blank" href="/">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a target="_blank" href="/">
              <YoutubeIcon />
            </a>
          </li>
        </ul>
      </div>

      <p>2020 Minimal. Все права защищены</p>
    </footer>
  )
}

export default Footer
