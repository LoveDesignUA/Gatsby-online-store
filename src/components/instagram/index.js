import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

// Assets
import cs from "./styles.module.scss"

// Main component
const Instagram = () => {
  const {
    allInstaNode: { nodes: instaImages },
  } = useStaticQuery(graphql`
    {
      allInstaNode(limit: 12, filter: { likes: { gt: 500000 } }) {
        nodes {
          thumbnails {
            src
          }
          localFile {
            id
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  // return <pre>{JSON.stringify(data, null, 4)}</pre>

  return (
    <section className={cs.instagram}>
      <h2>Наш Instagram</h2>

      <div className={cs.instaContainer}>
        <div className={cs.instaThumbnails}>
          {instaImages.map(instaImage => {
            {
              /* console.log(instaImage) */
            }

            {
              /* return <Image fluid={instaImage.localFile.childImageSharp.fluid} /> */
            }
            {
              /* return <Image fixed={instaImage.localFile.childImageSharp.fixed} /> */
            }

            return (
              <img
                key={instaImage.localFile.id}
                src={instaImage.thumbnails[3].src}
              />
            )
          })}
        </div>

        <a
          className={cs.instaLink}
          href="https://www.instagram.com/nike/?hl=ru"
          target="_black"
        >
          @Nike
        </a>
      </div>
    </section>
  )
}

export default Instagram
