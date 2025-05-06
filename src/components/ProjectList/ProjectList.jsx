"use client"

import { useState, useEffect } from "react"
import { getProjects } from "../../utils/projectLoader"
import styles from "./ProjectList.module.css"
import ProjectCard from "../ProjectCard/ProjectCard"

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectData = await getProjects()
        setProjects(projectData)
      } catch (error) {
        console.error("프로젝트를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return <div className={styles.loading}>프로젝트를 불러오는 중...</div>
  }

  return (
    <div className={styles.projectsContainer}>
      <h1>프로젝트</h1>
      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            summary={project.summary}
            image={project.image}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  )
}
