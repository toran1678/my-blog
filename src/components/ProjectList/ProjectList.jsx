"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getProjects } from "../../utils/markdownLoader"
import TagFilter from "../TagFilter/TagFilter"
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
    return <div className="loading">프로젝트를 불러오는 중...</div>
  }

  return (
    <div className={styles.projectsContainer}>
      <header className={styles.projectsHeader}>
        <h1>프로젝트</h1>
        <p className={styles.projectsDescription}>제가 진행한 다양한 프로젝트들을 소개합니다.</p>
      </header>

      {/* 태그 필터 컴포넌트 */}
      {allTags.length > 0 && <TagFilter tags={allTags} selectedTag={selectedTag} onTagSelect={handleTagSelect} />}

      {/* 필터링 결과 표시 */}
      {selectedTag && (
        <div className={styles.filterInfo}>
          <p>
            <span className={styles.tagName}>"{selectedTag}"</span> 태그로 필터링된 결과:
            <span className={styles.resultCount}>{filteredProjects.length}개</span>의 프로젝트
            {filteredProjects.length === 0 && (
              <button className={styles.clearFilterButton} onClick={() => handleTagSelect(null)}>
                필터 초기화
              </button>
            )}
          </p>
        </div>
      )}

      <div className={styles.projectGrid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <article key={project.slug} className={styles.projectCard}>
              {project.coverImage && (
                <img
                  src={project.coverImage || "/placeholder.svg"}
                  alt={`${project.title} 썸네일`}
                  className={styles.projectImage}
                />
              )}
              <div className={styles.projectInfo}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectExcerpt}>{project.excerpt}</p>
                {project.tags && (
                  <div className={styles.projectTags}>
                    {project.tags.map((tag) => (
                      <button
                        key={tag}
                        className={`${styles.tag} ${selectedTag === tag ? styles.activeTag : ""}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleTagSelect(tag)
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
                <Link to={`/projects/${project.slug}`} className={styles.viewProject}>
                  자세히 보기
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className={styles.emptyMessage}>
            <p>선택한 태그에 해당하는 프로젝트가 없습니다.</p>
            <button className={styles.clearFilterButton} onClick={() => handleTagSelect(null)}>
              모든 프로젝트 보기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
