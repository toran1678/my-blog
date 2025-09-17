import { Link } from "react-router-dom"
import styles from "./PostItem.module.css"
import PropTypes from "prop-types"
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder"

export default function PostItem({ id, title, summary, coverImage, tags, date, readTime }) {
  return (
    <div className={styles.postItem}>
      <Link to={`/posts/${id}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          {coverImage ? (
            <img
              src={coverImage || "/placeholder.svg"}
              alt={title}
              className={styles.coverImage}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none"
                e.target.parentNode.classList.add(styles.imageFallback)
              }}
            />
          ) : (
            <ImagePlaceholder title={title} />
          )}
          {/* 태그 라벨을 이미지 위에 표시 */}
          {tags && tags.length > 0 && <div className={styles.imageTag}>{tags[0]}</div>}
        </div>
        <div className={styles.contentWrapper}>
          {date && <div className={styles.date}>{date}</div>}
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.summary}>{summary}</p>
          <div className={styles.readMore}>
            더 읽기
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrow}>
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}

PostItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  coverImage: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string,
  readTime: PropTypes.string,
}
