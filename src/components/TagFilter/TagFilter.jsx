"use client"
import styles from "./TagFilter.module.css"

export default function TagFilter({ tags, selectedTag, onTagSelect }) {
  return (
    <div className={styles.tagFilterContainer}>
      <div className={styles.tagFilterHeader}>
        <h3>태그로 필터링</h3>
      </div>
      <div className={styles.tagList}>
        <button
          className={`${styles.tagButton} ${selectedTag === null ? styles.active : ""}`}
          onClick={() => onTagSelect(null)}
        >
          전체
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagButton} ${selectedTag === tag ? styles.active : ""}`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
