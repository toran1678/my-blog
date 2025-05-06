import { Link } from "react-router-dom"
import styles from "./PostItem.module.css"
import PropTypes from "prop-types"

export default function PostItem({ id, title, summary }) {
  return (
    <div className={styles.postItem}>
      <h3>{title}</h3>
      <p>{summary}</p>
      <Link to={`/posts/${id}`} className={styles.readMore}>
        더 읽기
      </Link>
    </div>
  )
}

PostItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
}
