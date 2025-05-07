"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProjectsByTag } from "../../utils/projectLoader"
import styles from "./TagProjects.module.css"

export default function TagProjects() {
  const { tag } = useParams()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectData = await getProjectsByTag(tag)
        setProjects(projectData)
      } catch (error) {
        console.error(`태그 ${tag}에 해당하는 프로젝트를 불러오는 중 오류가 발생했습니다:`, error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [tag])

  if (loading) {
    return <div className="loading">프로젝트를 불러오는 중...</div>
  }

  return (
    <div className={styles.tagProjectsContainer}>
      <header className={styles.tagProjectsHeader}>
        <h1>
          <span className={styles.tagName}>{tag}</span> 태그 프로젝트
        </h1>
        <p className={styles.tagProjectsDescription}>{tag} 태그가 있는 프로젝트 목록입니다.</p>
        <Link to="/projects" className={styles.backLink}>
          ← 모든 프로젝트 보기
        </Link>
      </header>

      <div className={styles.projectGrid}>
        {projects.length > 0 ? (
          projects.map((project) => (
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
                    {project.tags.map((projectTag) => (
                      <Link
                        key={projectTag}
                        to={`/tags/${projectTag}`}
                        className={`${styles.tag} ${projectTag === tag ? styles.activeTag : ""}`}
                      >
                        {projectTag}
                      </Link>
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
            <p>'{tag}' 태그에 해당하는 프로젝트가 없습니다.</p>
            <Link to="/projects" className={styles.backLink}>
              모든 프로젝트 보기
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
