"use client"

import { useState, useEffect } from "react"
import { getProjects } from "../../utils/markdownLoader"
import TagFilter from "../TagFilter/TagFilter"
import ProjectCard from "../ProjectCard/ProjectCard"
import styles from "./ProjectList.module.css"

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState(null)
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectData = await getProjects()
        setProjects(projectData)
        setFilteredProjects(projectData)

        // 모든 프로젝트에서 고유한 태그 추출
        const tags = new Set()
        projectData.forEach((project) => {
          if (project.tags && Array.isArray(project.tags)) {
            project.tags.forEach((tag) => tags.add(tag))
          }
        })
        setAllTags(Array.from(tags).sort())
      } catch (error) {
        console.error("프로젝트를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  // 태그 선택 시 프로젝트 필터링
  const handleTagSelect = (tag) => {
    setSelectedTag(tag)

    if (tag === null) {
      // 전체 선택 시 모든 프로젝트 표시
      setFilteredProjects(projects)
    } else {
      // 특정 태그 선택 시 해당 태그를 가진 프로젝트만 필터링
      const filtered = projects.filter((project) => project.tags && project.tags.includes(tag))
      setFilteredProjects(filtered)
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>프로젝트를 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className={styles.projectsContainer}>
      <header className={styles.projectsHeader}>
        <h1>프로젝트</h1>
        <p className={styles.projectsDescription}>제가 진행한 다양한 프로젝트들을 소개합니다.</p>
      </header>

      {/* 태그 필터 컴포넌트 */}
      {allTags.length > 0 && (
        <div className={styles.filterSection}>
          <h2 className={styles.filterTitle}>기술 스택으로 필터링</h2>
          <TagFilter tags={allTags} selectedTag={selectedTag} onTagSelect={handleTagSelect} />
        </div>
      )}

      {/* 필터링 결과 표시 */}
      {selectedTag && (
        <div className={styles.filterInfo}>
          <div className={styles.filterBadge}>
            <span className={styles.tagName}>{selectedTag}</span>
            <button className={styles.clearTagButton} onClick={() => handleTagSelect(null)} aria-label="태그 필터 제거">
              ×
            </button>
          </div>
          <p className={styles.resultText}>
            <span className={styles.resultCount}>{filteredProjects.length}개</span>의 프로젝트를 찾았습니다
          </p>
          {filteredProjects.length === 0 && (
            <button className={styles.clearFilterButton} onClick={() => handleTagSelect(null)}>
              모든 프로젝트 보기
            </button>
          )}
        </div>
      )}

      <div className={styles.projectGrid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              id={project.slug}
              title={project.title}
              summary={project.excerpt}
              image={project.coverImage}
              tags={project.tags}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.emptyIcon}
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <p className={styles.emptyMessage}>선택한 태그에 해당하는 프로젝트가 없습니다.</p>
            <button className={styles.clearFilterButton} onClick={() => handleTagSelect(null)}>
              모든 프로젝트 보기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
