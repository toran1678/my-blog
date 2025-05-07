"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPosts } from "../../utils/markdownLoader"
import { getRecentProjects } from "../../utils/projectLoader"
import styles from "./Home.module.css"

export default function Home() {
  const [recentPosts, setRecentPosts] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)

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
            안녕하세요, <span className={styles.highlight}>선빈</span>의 포트폴리오입니다
          </h1>
          <p className={styles.heroSubtitle}>웹 개발자로서의 저의 여정과 프로젝트들을 소개합니다</p>
          <div className={styles.heroButtons}>
            <Link to="/projects" className={styles.primaryButton}>
              프로젝트 보기
            </Link>
            <Link to="/posts" className={styles.secondaryButton}>
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
            <span className={styles.codeIcon}>{"</>"}</span>
          </div>
          <h3>웹 개발</h3>
          <p>React, Vite 등 최신 기술을 활용한 웹 애플리케이션 개발</p>
        </div>
        <div className={styles.introCard}>
          <div className={styles.introIcon}>
            <span className={styles.designIcon}>✦</span>
          </div>
          <h3>UI/UX 디자인</h3>
          <p>사용자 중심의 직관적이고 아름다운 인터페이스 디자인</p>
        </div>
        <div className={styles.introCard}>
          <div className={styles.introIcon}>
            <span className={styles.mobileIcon}>📱</span>
          </div>
          <h3>반응형 웹</h3>
          <p>모든 디바이스에서 최적의 경험을 제공하는 반응형 웹사이트</p>
        </div>
      </section>

      <section className={styles.recentPosts}>
        <div className={styles.sectionHeader}>
          <h2>최근 게시글</h2>
          <Link to="/posts" className={styles.viewAllLink}>
            모든 게시글 보기 <span className={styles.arrow}>→</span>
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
                {post.coverImage && (
                  <div className={styles.postImageContainer}>
                    <img
                      src={post.coverImage || "/my-blog/placeholder.svg"}
                      alt={`${post.title} 커버 이미지`}
                      className={styles.postImage}
                    />
                  </div>
                )}
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
                    더 읽기 <span className={styles.arrow}>→</span>
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
            모든 프로젝트 보기 <span className={styles.arrow}>→</span>
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
                  <img
                    src={project.coverImage || "/my-blog/placeholder.svg?text=Project+Image"}
                    alt={`${project.title} 썸네일`}
                    className={styles.projectImage}
                  />
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
                    자세히 보기 <span className={styles.arrow}>→</span>
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
