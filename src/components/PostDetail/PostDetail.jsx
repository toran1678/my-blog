"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { getPostBySlug } from "../../utils/markdownLoader"
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer"
import TableOfContents from "../TableOfContents/TableOfContents"
import { getImageUrl, debugImagePath } from "../../utils/placeholderImage"
import styles from "./PostDetail.module.css"

export default function PostDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)
  const contentRef = useRef(null)
  const heroRef = useRef(null)
  const [tocOpacity, setTocOpacity] = useState(0)
  const heroEndRef = useRef(null)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // 현재 포스트 불러오기
        const postData = await getPostBySlug(slug)
        if (postData) {
          setPost(postData)
        } else {
          setError("포스트를 찾을 수 없습니다.")
        }
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

  // 포스트 날짜 포맷팅
  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // 읽는 시간 계산 (평균 분당 200단어 기준)
  const calculateReadingTime = (content) => {
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return minutes
  }

  const readingTime = calculateReadingTime(post.content)

  // 커버 이미지 URL 처리
  let coverImageUrl = post.coverImage || ""

  // 이미지 경로 처리
  if (coverImageUrl) {
    coverImageUrl = getImageUrl(coverImageUrl)
    // 디버깅을 위한 로그 추가
    debugImagePath(post.coverImage, coverImageUrl)
  }

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
          <h1 className={styles.postTitle}>{post.title}</h1>

          <div className={styles.postMeta}>
            <div className={styles.postDetails}>
              <time dateTime={post.date} className={styles.postDate}>
                {formattedDate}
              </time>
              <span className={styles.postReadingTime}>{readingTime}분 소요</span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <Link key={tag} to={`/posts?tag=${encodeURIComponent(tag)}`} className={styles.tagPill}>
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 커버 이미지 - 존재할 때만 표시 */}
        {coverImageUrl && !imageError ? (
          <div className={styles.coverImageWrapper}>
            <div className={styles.coverImageContainer}>
              <img
                src={coverImageUrl || "/placeholder.svg"}
                alt={`${post.title} 커버 이미지`}
                className={styles.coverImage}
                onError={() => {
                  console.error("이미지 로딩 실패:", coverImageUrl)
                  setImageError(true)
                }}
              />
            </div>
          </div>
        ) : null}
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
        <TableOfContents content={post.content} containerRef={contentRef} />
      </div>

      <div className={styles.postContentWrapper}>
        <article className={styles.postContent} ref={contentRef}>
          <MarkdownRenderer content={post.content} />

          <div className={styles.postFooter}>
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
          </div>
        </article>

        {/* 기존 사이드 목차 제거 */}
      </div>
    </div>
  )
}
