"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getProjects } from "../../utils/markdownLoader"
import TagFilter from "../TagFilter/TagFilter"
import ProjectCard from "../ProjectCard/ProjectCard"
import styles from "./ProjectList.module.css"

export default function ProjectList() {
  const location = useLocation()
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState(null)
  const [allTags, setAllTags] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  // URL에서 태그/페이지 파라미터 가져오기
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tagParam = params.get("tag")
    if (tagParam) {
      setSelectedTag(tagParam)
    }
    const pageParam = parseInt(params.get("page") || "1", 10)
    setCurrentPage(Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam)
  }, [location.search])

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectData = await getProjects()
        setProjects(projectData)

        // URL에서 태그 파라미터가 있으면 해당 태그로 필터링
        const params = new URLSearchParams(location.search)
        const tagParam = params.get("tag")

        if (tagParam) {
          setSelectedTag(tagParam)
          const filtered = projectData.filter((project) => project.tags && project.tags.includes(tagParam))
          setFilteredProjects(filtered)
        } else {
          setFilteredProjects(projectData)
        }

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
  }, [location.search])

  // 태그 선택 시 프로젝트 필터링
  const handleTagSelect = (tag) => {
    setSelectedTag(tag)

    if (tag === null) {
      // 전체 선택 시 모든 프로젝트 표시
      setFilteredProjects(projects)
      // URL에서 태그 파라미터 제거
      window.history.pushState({}, "", "/my-blog/projects")
    } else {
      // 특정 태그 선택 시 해당 태그를 가진 프로젝트만 필터링
      const filtered = projects.filter((project) => project.tags && project.tags.includes(tag))
      setFilteredProjects(filtered)
      // URL에 태그 파라미터 추가
      window.history.pushState({}, "", `/my-blog/projects?tag=${encodeURIComponent(tag)}`)
    }
    // 태그 변경 시 페이지 1로 이동
    setCurrentPage(1)
  }

  // 페이지네이션 계산
  const totalItems = filteredProjects.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const visibleProjects = filteredProjects.slice(startIndex, startIndex + pageSize)

  const updateUrlWithPage = (page) => {
    const params = new URLSearchParams(location.search)
    if (page <= 1) {
      params.delete("page")
    } else {
      params.set("page", String(page))
    }
    const query = params.toString()
    const base = "/my-blog/projects"
    window.history.pushState({}, "", query ? `${base}?${query}` : base)
  }

  const goToPage = (page) => {
    const next = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(next)
    updateUrlWithPage(next)
  }

  const getPageNumbers = () => {
    const pages = []
    const windowSize = 5
    let start = Math.max(1, safeCurrentPage - Math.floor(windowSize / 2))
    let end = start + windowSize - 1
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - windowSize + 1)
    }
    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push("...")
    }
    for (let p = start; p <= end; p++) pages.push(p)
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }
    return pages
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
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project) => (
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

      {/* 페이지네이션 */}
      {totalItems > 0 && (
        <div className={styles.pagination}>
          <button className={styles.pageButton} onClick={() => goToPage(safeCurrentPage - 1)} disabled={safeCurrentPage === 1}>
            이전
          </button>
          <div className={styles.pageList}>
            {getPageNumbers().map((p, idx) =>
              typeof p === "number" ? (
                <button
                  key={p}
                  className={`${styles.pageNumber} ${p === safeCurrentPage ? styles.activePage : ""}`}
                  onClick={() => goToPage(p)}
                  aria-current={p === safeCurrentPage ? "page" : undefined}
                >
                  {p}
                </button>
              ) : (
                <span key={`ellipsis-${idx}`} className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              ),
            )}
          </div>
          <button
            className={styles.pageButton}
            onClick={() => goToPage(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  )
}
