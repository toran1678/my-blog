"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import { getPosts } from "../../utils/markdownLoader"
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer"
import TableOfContents from "../TableOfContents/TableOfContents"
import Utterances from "../Comments/Utterances"
import { useTheme } from "../../contexts/ThemeContext"
import styles from "./PostDetail.module.css"

export default function PostDetail() {
  const { slug } = useParams()
  const location = useLocation()
  const { theme } = useTheme()
  const [post, setPost] = useState(null)
  const [prevPost, setPrevPost] = useState(null) // 이전 글(더 오래된 글)
  const [nextPost, setNextPost] = useState(null) // 다음 글(더 최신 글)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const contentRef = useRef(null)
  const heroRef = useRef(null)
  const [tocOpacity, setTocOpacity] = useState(0)
  const heroEndRef = useRef(null)

  const scrollTopNow = () => {
    // 환경에 따라 scroll container가 달라도 최대한 확실하게 0으로 맞춤
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  useEffect(() => {
    const loadPost = async () => {
      try {
        const posts = await getPosts() // 날짜 기준 내림차순
        const index = posts.findIndex((p) => p.slug === slug)

        if (index === -1) {
          setError("포스트를 찾을 수 없습니다.")
          setPost(null)
          setPrevPost(null)
          setNextPost(null)
          return
        }

        const current = posts[index]
        setPost(current)

        // posts는 최신 -> 과거 순
        // 이전 글: 더 오래된 글(인덱스 + 1), 다음 글: 더 최신 글(인덱스 - 1)
        setPrevPost(index + 1 < posts.length ? posts[index + 1] : null)
        setNextPost(index - 1 >= 0 ? posts[index - 1] : null)
      } catch (err) {
        console.error("포스트를 불러오는 중 오류가 발생했습니다:", err)
        setError("포스트를 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  // 페이지 로드 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // 커버 이미지 하단 통과 시 목차 표시/숨김 (최종 버전)
  useEffect(() => {
    if (!post) return
    
    const updateTocVisibility = () => {
      if (!heroRef.current) return
      
      const headerHeight = 70
      const heroRect = heroRef.current.getBoundingClientRect()
      
      // 커버 이미지 하단이 헤더 아래로 사라지면 목차 표시
      const shouldShow = heroRect.bottom <= headerHeight
      const targetOpacity = shouldShow ? 1 : 0
      
      setTocOpacity(targetOpacity)
    }
    
    // 초기 실행
    updateTocVisibility()
    
    // 스크롤 및 리사이즈 이벤트 등록 (안정적인 방식)
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
  }, [post])

  if (loading) {
    return <div className="loading">포스트를 불러오는 중...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!post) {
    return <div className="not-found">포스트를 찾을 수 없습니다.</div>
  }

  // 포스트 날짜 포맷팅: YYYY.MM.DD
  const d = new Date(post.date)
  const formattedDate = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`

  return (
    <div className={styles.postDetailContainer}>
      <div className={styles.postNavigation}>
        <Link to="/posts" className={styles.backLink}>
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
          모든 게시글
        </Link>
      </div>

      <div className={styles.postHero} ref={heroRef}>
        <div className={styles.postHeroContent}>
          {post.tags && post.tags.length > 0 && (
            <div className={styles.postTagsHeader} aria-label="태그">
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <Link key={tag} to={`/posts?tag=${encodeURIComponent(tag)}`} className={styles.tagPill}>
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <h1 className={styles.postTitle}>{post.title}</h1>

          <time dateTime={post.date} className={styles.postDateSimple}>
            {formattedDate}
          </time>
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
          pointerEvents: tocOpacity > 0 ? 'auto' : 'none',
          transition: 'opacity 0.3s ease'
        }}
      >
        <TableOfContents content={post.content} containerRef={contentRef} className={styles.postToc} />
      </div>

      <div className={styles.postContentWrapper}>
        <article className={styles.postContent} ref={contentRef}>
          <MarkdownRenderer content={post.content} />

          <div className={styles.postFooter}>
            {/*
              하단 태그/목록 버튼은 요청에 따라 잠시 숨김 처리

              {post.tags && post.tags.length > 0 && (
                <div className={styles.footerTags}>
                  <h3 className={styles.footerTagsTitle}>태그</h3>
                  <div className={styles.tagsList}>
                    {post.tags.map((tag) => (
                      <Link key={tag} to={`/posts?tag=${encodeURIComponent(tag)}`} className={styles.tag}>
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.postNavLinks}>
                <Link to="/posts" className={styles.backLink}>
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
                  게시글 목록으로 돌아가기
                </Link>
              </div>
            */}

            <nav className={styles.prevNextNav} aria-label="이전/다음 게시글">
              <div className={styles.prevNextGrid}>
                {prevPost ? (
                  <Link
                    to={`/posts/${prevPost.slug}`}
                    className={styles.prevNextLink}
                    aria-label={`이전 글: ${prevPost.title}`}
                    onClick={scrollTopNow}
                  >
                    <div className={styles.prevNextLabel}>이전 글</div>
                    <div className={styles.prevNextTitle}>{prevPost.title}</div>
                  </Link>
                ) : (
                  <div className={`${styles.prevNextLink} ${styles.disabled}`} aria-hidden="true">
                    <div className={styles.prevNextLabel}>이전 글</div>
                    <div className={styles.prevNextTitle}>없음</div>
                  </div>
                )}

                {nextPost ? (
                  <Link
                    to={`/posts/${nextPost.slug}`}
                    className={`${styles.prevNextLink} ${styles.alignRight}`}
                    aria-label={`다음 글: ${nextPost.title}`}
                    onClick={scrollTopNow}
                  >
                    <div className={styles.prevNextLabel}>다음 글</div>
                    <div className={styles.prevNextTitle}>{nextPost.title}</div>
                  </Link>
                ) : (
                  <div className={`${styles.prevNextLink} ${styles.alignRight} ${styles.disabled}`} aria-hidden="true">
                    <div className={styles.prevNextLabel}>다음 글</div>
                    <div className={styles.prevNextTitle}>없음</div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <section className={styles.commentsSection} aria-label="댓글">
            <Utterances
              key={location.pathname}
              repo="toran1678/my-blog"
              issueTerm="pathname"
              label="comments"
              theme={theme === "dark" ? "photon-dark" : "github-light"}
            />
          </section>
        </article>

        {/* 기존 사이드 목차 제거 */}
      </div>
    </div>
  )
}
