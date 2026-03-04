"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ThumbnailPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import styles from "./ProjectCard.module.css"
import PropTypes from "prop-types"

export default function ProjectCard({ id, title, summary, image, tags = [], date, type, period }) {
  const [imageError, setImageError] = useState(false)

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  // 태그 클릭 이벤트 핸들러 - 이벤트 버블링 방지
  const handleTagClick = (e, tag) => {
    e.preventDefault() // 링크 이벤트 방지
    e.stopPropagation() // 버블링 방지

    // 프로젝트 목록 페이지로 이동하고 해당 태그로 필터링
    // URL 파라미터로 태그 정보 전달
    window.location.href = `/my-blog/projects?tag=${encodeURIComponent(tag)}`
  }

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
          {(type || tags.length > 0) && (
            <div className={styles.featuredTag}>
              <span>{type ? (type.includes('팀') ? '팀 프로젝트' : '개인 프로젝트') : tags[0]}</span>
            </div>
          )}
        </div>

        <div className={styles.projectInfo}>
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>{title}</h3>
          </div>
          {date && <div className={styles.projectDate}>{formatDate(date)}</div>}
          <p className={styles.projectSummary}>{summary}</p>

          {tags.length > 0 && (
            <div className={styles.projectTags}>
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag} onClick={(e) => handleTagClick(e, tag)}>
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className={styles.tagMore}>+{tags.length - 3}</span>
              )}
            </div>
          )}

          <div className={styles.projectFooter}>
            <span className={styles.projectPeriod}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {period || '기간 미상'}
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
  date: PropTypes.string,
  type: PropTypes.string,
  period: PropTypes.string,
}
