"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getPosts } from "../../utils/markdownLoader"
import { ThumbnailPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import styles from "./PostList.module.css"

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postData = await getPosts()
        setPosts(postData)
      } catch (error) {
        console.error("포스트를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const handleImageError = (slug) => {
    setImageErrors((prev) => ({
      ...prev,
      [slug]: true,
    }))
  }

  // 읽는 시간 계산 (평균 분당 200단어 기준)
  const calculateReadingTime = (content) => {
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return minutes
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>게시글을 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className={styles.postsContainer}>
      <header className={styles.postsHeader}>
        <h1>블로그 게시글</h1>
        <p className={styles.postsDescription}>개발 경험과 지식을 공유하는 블로그 게시글 모음입니다.</p>
      </header>

      <div className={styles.postList}>
        {posts.length > 0 ? (
          posts.map((post) => {
            const readingTime = calculateReadingTime(post.content || "")
            const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })

            return (
              <article key={post.slug} className={styles.postCard}>
                <div className={styles.postContent}>
                  {/* 이미지 섹션 */}
                  <div className={styles.postImageWrapper}>
                    <Link to={`/posts/${post.slug}`} className={styles.imageLink}>
                      {post.coverImage && !imageErrors[post.slug] ? (
                        <img
                          src={post.coverImage || "/placeholder.svg"}
                          alt={`${post.title} 커버 이미지`}
                          className={styles.postImage}
                          onError={() => handleImageError(post.slug)}
                        />
                      ) : (
                        <div className={styles.placeholderWrapper}>
                          <ThumbnailPlaceholder title={post.title} />
                        </div>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className={styles.featuredTag}>
                          <span>{post.tags[0]}</span>
                        </div>
                      )}
                    </Link>
                  </div>

                  {/* 포스트 정보 섹션 */}
                  <div className={styles.postInfo}>
                    <div className={styles.postMeta}>
                      <time dateTime={post.date} className={styles.postDate}>
                        {formattedDate}
                      </time>
                      <span className={styles.readingTime}>{readingTime}분 소요</span>
                    </div>

                    <Link to={`/posts/${post.slug}`} className={styles.titleLink}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                    </Link>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>

                    <div className={styles.postFooter}>
                      {/* 태그 섹션 */}
                      {post.tags && post.tags.length > 0 && (
                        <div className={styles.postTags}>
                          {post.tags.map((tag) => (
                            <Link key={tag} to={`/tags/${tag}`} className={styles.tag}>
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* 더 읽기 링크 */}
                      <Link to={`/posts/${post.slug}`} className={styles.readMore}>
                        더 읽기
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.readMoreIcon}
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })
        ) : (
          <div className={styles.emptyState}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.emptyIcon}
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <p className={styles.emptyMessage}>아직 작성된 게시글이 없습니다.</p>
            <Link to="/" className={styles.emptyButton}>
              홈으로 돌아가기
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
