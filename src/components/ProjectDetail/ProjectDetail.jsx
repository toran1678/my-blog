"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProjectById, getRelatedProjects } from "../../utils/projectLoader"
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer"
import styles from "./ProjectDetail.module.css"

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [relatedProjects, setRelatedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        const projectData = await getProjectById(id)
        setProject(projectData)

        // 관련 프로젝트 불러오기
        const related = await getRelatedProjects(id, 3)
        setRelatedProjects(related)
      } catch (err) {
        console.error("프로젝트를 불러오는 중 오류가 발생했습니다:", err)
        setError("프로젝트를 찾을 수 없습니다.")
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id])

  if (loading) {
    return <div className={styles.loading}>프로젝트를 불러오는 중...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  if (!project) {
    return <div className={styles.notFound}>프로젝트를 찾을 수 없습니다.</div>
  }

  return (
    <article className={styles.projectDetail}>
      <div className={styles.projectNavigation}>
        <Link to="/projects" className={styles.backLink}>
          ← 모든 프로젝트
        </Link>
      </div>

      <header className={styles.projectHeader}>
        <h1 className={styles.projectTitle}>{project.title}</h1>

        {project.tags && (
          <div className={styles.projectTags}>
            {project.tags.map((tag) => (
              <Link key={tag} to={`/tags/${tag}`} className={styles.tag}>
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {project.coverImage && (
        <img
          src={project.coverImage || "/placeholder.svg"}
          alt={`${project.title} 이미지`}
          className={styles.coverImage}
        />
      )}

      <div className={styles.projectLinks}>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.projectLink} ${styles.demoLink}`}
          >
            데모 보기
          </a>
        )}

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.projectLink} ${styles.repoLink}`}
          >
            GitHub 저장소
          </a>
        )}
      </div>

      <div className={styles.projectContent}>
        <MarkdownRenderer content={project.content} />
      </div>

      {relatedProjects.length > 0 && (
        <div className={styles.relatedProjects}>
          <h2>관련 프로젝트</h2>
          <div className={styles.relatedProjectsGrid}>
            {relatedProjects.map((relatedProject) => (
              <div key={relatedProject.slug} className={styles.relatedProjectCard}>
                {relatedProject.coverImage && (
                  <img
                    src={relatedProject.coverImage || "/placeholder.svg"}
                    alt={`${relatedProject.title} 썸네일`}
                    className={styles.relatedProjectImage}
                  />
                )}
                <div className={styles.relatedProjectInfo}>
                  <h3>{relatedProject.title}</h3>
                  <Link to={`/projects/${relatedProject.slug}`} className={styles.viewRelatedProject}>
                    자세히 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.projectFooter}>
        <Link to="/projects" className={styles.backLink}>
          ← 프로젝트 목록으로 돌아가기
        </Link>
      </div>
    </article>
  )
}
