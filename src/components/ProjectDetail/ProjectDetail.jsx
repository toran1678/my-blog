"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProjectById } from "../../utils/projectLoader"
import ReactMarkdown from "react-markdown"
import styles from "./ProjectDetail.module.css"

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await getProjectById(id)
        setProject(projectData)
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
    <div className={styles.projectDetail}>
      <Link to="/projects" className={styles.backLink}>
        ← 프로젝트 목록으로
      </Link>

      <h1>{project.title}</h1>

      {project.image && (
        <img
          src={project.image || "/my-blog/placeholder.svg"}
          alt={`${project.title} 이미지`}
          className={styles.projectDetailImage}
        />
      )}

      <div className={styles.projectMeta}>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

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
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>
    </div>
  )
}
