"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getProjectById, getRelatedProjects } from "../../utils/projectLoader"
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer"
import TableOfContents from "../TableOfContents/TableOfContents"
import { CoverPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import styles from "./ProjectDetail.module.css"

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [relatedProjects, setRelatedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [theme] = useState("light") // Example theme state, replace with your actual theme implementation
  const contentRef = useRef(null)
  const heroRef = useRef(null)
  const [tocOpacity, setTocOpacity] = useState(0)
  const heroEndRef = useRef(null)

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

  // 페이지 로드 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // 커버 이미지 하단 통과 시 목차 표시/숨김
  useEffect(() => {
    if (!project) return
    
    const updateTocVisibility = () => {
      if (!heroRef.current) return
      
      const headerHeight = 80 // 일반 포스트와 동일하게 조정
      const heroRect = heroRef.current.getBoundingClientRect()
      
      // 커버 이미지 하단이 헤더 아래로 사라지면 목차 표시
      const shouldShow = heroRect.bottom <= headerHeight
      const targetOpacity = shouldShow ? 1 : 0
      
      setTocOpacity(targetOpacity)
    }
    
    // 초기 실행
    updateTocVisibility()
    
    // 스크롤 및 리사이즈 이벤트 등록
    window.addEventListener("scroll", updateTocVisibility, false)
    document.addEventListener("scroll", updateTocVisibility, false)
    document.body.addEventListener("scroll", updateTocVisibility, false)
    window.addEventListener("resize", updateTocVisibility, false)
    
    return () => {
      window.removeEventListener("scroll", updateTocVisibility, false)
      document.removeEventListener("scroll", updateTocVisibility, false)
      document.body.removeEventListener("scroll", updateTocVisibility, false)
      window.removeEventListener("resize", updateTocVisibility, false)
    }
  }, [project])

  // 태그 클릭 핸들러
  const handleTagClick = (e, tag) => {
    e.preventDefault()
    navigate(`/projects?tag=${encodeURIComponent(tag)}`)
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>프로젝트를 불러오는 중...</p>
      </div>
    )
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.backIcon}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          모든 프로젝트
        </Link>
      </div>

      <div className={styles.projectHero} ref={heroRef}>
        <header className={styles.projectHeader}>
          <h1 className={styles.projectTitle}>{project.title}</h1>

          {project.tags && (
            <div className={styles.projectTags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag} onClick={(e) => handleTagClick(e, tag)}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.coverImageWrapper}>
          {project.coverImage && !imageError ? (
            <img
              src={project.coverImage || "/placeholder.svg"}
              alt={`${project.title} 이미지`}
              className={styles.coverImage}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.placeholderContainer}>
              <CoverPlaceholder title={project.title} />
            </div>
          )}
        </div>

        <div className={styles.projectLinks}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.projectLink} ${styles.demoLink}`}
              style={{ color: theme === "dark" ? "#ffffff" : "" }} // 다크 모드에서 텍스트 색상 강제 지정
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.linkIcon}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.linkIcon}
              >
                <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.22.66-.48v-1.7c-2.67.6-3.23-1.13-3.23-1.13-.44-1.1-1.08-1.4-1.08-1.4-.88-.6.07-.6.07-.6.97.07 1.48 1 1.48 1 .86 1.47 2.26 1.05 2.8.8.09-.62.35-1.05.63-1.3-2.2-.25-4.5-1.1-4.5-4.9 0-1.08.38-1.97 1-2.65-.1-.25-.44-1.23.1-2.55 0 0 .83-.27 2.7 1a9.4 9.4 0 0 1 5 0c1.87-1.27 2.7-1 2.7-1 .54 1.32.2 2.3.1 2.55.62.68 1 1.57 1 2.65 0 3.8-2.3 4.65-4.5 4.9.35.3.67.9.67 1.8v2.67c0 .26.16.56.67.48A10 10 0 0 0 12 2z" />
              </svg>
              GitHub 저장소
            </a>
          )}
        </div>
      </div>

      {/* 커버 하단 센티넬: 이 지점을 지나면 목차 표시 */}
      <div ref={heroEndRef} className={styles.heroEndSentinel} aria-hidden="true" />

      {/* 플로팅 목차 - 스크롤에 따라 나타남/사라짐 */}
      <div 
        className={styles.floatingToc} 
        role="navigation" 
        aria-label="본문 목차"
        style={{ 
          opacity: tocOpacity,
          pointerEvents: 'auto', // 항상 활성화하여 목차 기능 정상 작동
          transition: 'opacity 0.3s ease'
        }}
      >
        <TableOfContents content={project.content} containerRef={contentRef} className={styles.projectToc} />
      </div>

      <div className={styles.projectContentWrapper}>
        <div className={styles.projectContent} ref={contentRef}>
          <MarkdownRenderer content={project.content} />
        </div>
      </div>

      {relatedProjects.length > 0 && (
        <div className={styles.relatedProjects}>
          <h2 className={styles.relatedTitle}>관련 프로젝트</h2>
          <div className={styles.relatedProjectsGrid}>
            {relatedProjects.map((relatedProject) => (
              <div key={relatedProject.slug} className={styles.relatedProjectCard}>
                <Link to={`/projects/${relatedProject.slug}`} className={styles.relatedProjectLink}>
                  <div className={styles.relatedImageWrapper}>
                    {relatedProject.coverImage ? (
                      <img
                        src={relatedProject.coverImage || "/placeholder.svg"}
                        alt={`${relatedProject.title} 썸네일`}
                        className={styles.relatedProjectImage}
                      />
                    ) : (
                      <div className={styles.relatedPlaceholder}>
                        <span>{relatedProject.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.relatedProjectInfo}>
                    <h3>{relatedProject.title}</h3>
                    <span className={styles.viewRelatedProject}>
                      자세히 보기
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.relatedArrow}
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.projectFooter}>
        <Link to="/projects" className={styles.backLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.backIcon}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          프로젝트 목록으로 돌아가기
        </Link>
      </div>
    </article>
  )
}
