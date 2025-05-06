import { Link } from "react-router-dom"
import styles from "./ProjectCard.module.css"
import PropTypes from "prop-types"

export default function ProjectCard({ id, title, summary, image, tags = [] }) {
  return (
    <div className={styles.projectCard}>
      {image && (
        <img src={image || "/my-blog/placeholder.svg"} alt={`${title} 썸네일`} className={styles.projectImage} />
      )}
      <div className={styles.projectInfo}>
        <h3>{title}</h3>
        <p>{summary}</p>
        {tags.length > 0 && (
          <div className={styles.projectTags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link to={`/projects/${id}`} className={styles.viewProject}>
          자세히 보기
        </Link>
      </div>
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
