"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ThumbnailPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import styles from "./ProjectCard.module.css"
import PropTypes from "prop-types"

export default function ProjectCard({ id, title, summary, image, tags = [] }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={styles.projectCard}>
      <Link to={`/projects/${id}`} className={styles.projectLink}>
        <div className={styles.projectImageWrapper}>
          {image && !imageError ? (
            <img
              src={image || "/my-blog/placeholder.svg"}
              alt={`${title} 썸네일`}
              className={styles.projectImage}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.placeholderWrapper}>
              <ThumbnailPlaceholder title={title} />
            </div>
          )}
          {tags.length > 0 && (
            <div className={styles.featuredTag}>
              <span>{tags[0]}</span>
            </div>
          )}
        </div>

        <div className={styles.projectInfo}>
          <h3 className={styles.projectTitle}>{title}</h3>
          <p className={styles.projectSummary}>{summary}</p>

          {tags.length > 0 && (
            <div className={styles.projectTags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className={styles.viewProjectWrapper}>
            <span className={styles.viewProject}>
              자세히 보기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.viewProjectIcon}
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  image: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}
