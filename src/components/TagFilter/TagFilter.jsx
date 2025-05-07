"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import styles from "./TagFilter.module.css"

export default function TagFilter({ tags, selectedTag, onTagSelect }) {
  const [searchTerm, setSearchTerm] = useState("")

  // 태그 검색 필터링
  const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className={styles.tagFilterContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="태그 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button className={styles.clearSearch} onClick={() => setSearchTerm("")} aria-label="검색어 지우기">
            ×
          </button>
        )}
      </div>

      <div className={styles.tagList}>
        <button
          className={`${styles.tagButton} ${selectedTag === null ? styles.activeTag : ""}`}
          onClick={() => onTagSelect(null)}
        >
          전체
        </button>

        {filteredTags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagButton} ${selectedTag === tag ? styles.activeTag : ""}`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}

        {filteredTags.length === 0 && searchTerm && (
          <div className={styles.noTagsFound}>
            <p>"{searchTerm}"에 해당하는 태그가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

TagFilter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTag: PropTypes.string,
  onTagSelect: PropTypes.func.isRequired,
}
