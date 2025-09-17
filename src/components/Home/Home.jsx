"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPosts } from "../../utils/markdownLoader"
import { getRecentProjects } from "../../utils/projectLoader"
import { ThumbnailPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import { getImageUrl } from "../../utils/placeholderImage"
import { useTheme } from "../../contexts/ThemeContext"
import styles from "./Home.module.css"

export default function Home() {
  const [recentPosts, setRecentPosts] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  // 다크 모드에서 버튼 스타일 조정
  const primaryButtonStyle =
    theme === "dark"
      ? {
          color: "#FFFFFF !important",
          backgroundColor: "#0088cc",
          fontWeight: 700,
          border: "none", // 테두리 제거
          letterSpacing: "0.5px",
          boxSizing: "border-box",
        }
      : {
          border: "2px solid transparent", // 라이트 모드에서도 동일한 크기 유지
          boxSizing: "border-box",
        }

  const secondaryButtonStyle =
    theme === "dark"
      ? {
          color: "#60c9ff",
          borderColor: "#60c9ff",
          fontWeight: 600,
        }
      : {}

  useEffect(() => {
    const loadContent = async () => {
      try {
        // 최근 게시글 3개 가져오기
        const posts = await getPosts()
        setRecentPosts(posts.slice(0, 3))

        // 최근 프로젝트 2개 가져오기
        const projects = await getRecentProjects(2)
        setFeaturedProjects(projects)
      } catch (error) {
        console.error("콘텐츠를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            안녕하세요, <span className={styles.highlight}>선빈</span>의<br />
            포트폴리오입니다
          </h1>
          <p className={styles.heroSubtitle}>웹 개발자로서의 저의 여정과 프로젝트들을 소개합니다</p>
          <div className={styles.heroButtons}>
            <Link to="/projects" className={styles.primaryButton} style={primaryButtonStyle}>
              프로젝트 보기
            </Link>
            <Link to="/posts" className={styles.secondaryButton} style={secondaryButtonStyle}>
              블로그 보기
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroShape}></div>
          <div className={styles.codeBlock}>
            <pre className={styles.code}>
              <code>
                {`function Developer() {
  const [skills, setSkills] = useState([
    'React', 'JavaScript', 'CSS'
  ]);
  
  const [passion, setPassion] = useState(100);
  
  useEffect(() => {
    // 항상 배우고 성장하기
    learnNewTech();
  }, []);
  
  return <Coding />;
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.introCard}>
          <div className={styles.introIcon}>
            <span className={styles.codeIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
              <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
            </svg>
            </span>
          </div>
          <h3>웹 개발</h3>
          <p>React, Vite 등 최신 기술을 활용한 웹 애플리케이션 개발</p>
        </div>
        <div className={styles.introCard}>
          <div className={styles.introIcon}>
            <span className={styles.designIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            </span>
          </div>
          <h3>UI/UX 디자인</h3>
          <p>사용자 중심의 직관적이고 아름다운 인터페이스 디자인</p>
        </div>
        <div className={styles.introCard}>
          <div className={styles.introIcon}>
            <span className={styles.mobileIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            </span>
          </div>
          <h3>반응형 웹</h3>
          <p>모든 디바이스에서 최적의 경험을 제공하는 반응형 웹사이트</p>
        </div>
      </section>

      <section className={styles.recentPosts}>
        <div className={styles.sectionHeader}>
          <h2>최근 게시글</h2>
          <Link to="/posts" className={styles.viewAllLink}>
            모든 게시글 보기 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrow}>
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
        </div>

        <div className={styles.postList}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>게시글을 불러오는 중...</p>
            </div>
          ) : recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <div className={styles.postImageContainer}>
                  {post.coverImage ? (
                    <img
                      src={getImageUrl(post.coverImage) || "/my-blog/placeholder.svg"}
                      alt={`${post.title} 커버 이미지`}
                      className={styles.postImage}
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.nextElementSibling.style.display = "flex"
                      }}
                    />
                  ) : null}
                  <div className={styles.placeholderWrapper} style={{ display: post.coverImage ? "none" : "flex" }}>
                    <ThumbnailPlaceholder title={post.title} />
                  </div>
                </div>
                <div className={styles.postContent}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <time className={styles.postDate} dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <Link to={`/posts/${post.slug}`} className={styles.readMoreLink}>
                    더 읽기 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrow}>
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>아직 작성된 게시글이 없습니다.</p>
              <Link to="/posts" className={styles.primaryButton}>
                첫 게시글 작성하기
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className={styles.featuredProjects}>
        <div className={styles.sectionHeader}>
          <h2>주요 프로젝트</h2>
          <Link to="/projects" className={styles.viewAllLink}>
            모든 프로젝트 보기 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrow}>
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
        </div>
        <div className={styles.projectGrid}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>프로젝트를 불러오는 중...</p>
            </div>
          ) : featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <article key={project.slug} className={styles.projectCard}>
                <div className={styles.projectImageContainer}>
                  {project.coverImage ? (
                    <img
                      src={getImageUrl(project.coverImage) || "/my-blog/placeholder.svg?text=Project+Image"}
                      alt={`${project.title} 썸네일`}
                      className={styles.projectImage}
                      onError={() => {}}
                    />
                  ) : (
                    <div className={styles.placeholderWrapper}>
                      <ThumbnailPlaceholder title={project.title} />
                    </div>
                  )}
                  {project.tags && (
                    <div className={styles.projectTags}>
                      {project.tags.slice(0, 3).map((tag) => (
                        <Link key={tag} to={`/tags/${tag}`} className={styles.projectTag}>
                          {tag}
                        </Link>
                      ))}
                      {project.tags.length > 3 && <span className={styles.moreTags}>+{project.tags.length - 3}</span>}
                    </div>
                  )}
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectExcerpt}>{project.excerpt}</p>
                  <Link to={`/projects/${project.slug}`} className={styles.viewProjectLink}>
                    자세히 보기 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrow}>
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>아직 등록된 프로젝트가 없습니다.</p>
              <Link to="/projects" className={styles.primaryButton}>
                프로젝트 추가하기
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>함께 일해보세요</h2>
          <p className={styles.ctaText}>새로운 프로젝트나 협업 기회가 있으시다면 언제든지 연락주세요.</p>
          <Link to="/about" className={styles.ctaButton}>
            연락처 보기
          </Link>
        </div>
      </section>
    </div>
  )
}
