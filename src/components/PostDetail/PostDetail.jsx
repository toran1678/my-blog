"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getPostBySlug, getPosts } from "../../utils/markdownLoader"
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer"
import { CoverPlaceholder, ThumbnailPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import styles from "./PostDetail.module.css"

export default function PostDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  const [allTags, setAllTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // 현재 포스트 불러오기
        const postData = await getPostBySlug(slug)
        if (postData) {
          setPost(postData)

          // 모든 포스트 불러오기
          const allPosts = await getPosts()

          // 최근 포스트 (현재 포스트 제외, 최대 5개)
          const recent = allPosts.filter((p) => p.slug !== slug).slice(0, 5)
          setRecentPosts(recent)

          // 관련 포스트 (같은 태그를 가진 포스트, 최대 3개)
          if (postData.tags && postData.tags.length > 0) {
            const related = allPosts
              .filter((p) => p.slug !== slug && p.tags && p.tags.some((tag) => postData.tags.includes(tag)))
              .slice(0, 3)
            setRelatedPosts(related)
          }

          // 모든 태그 수집
          const tagsSet = new Set()
          allPosts.forEach((post) => {
            if (post.tags && Array.isArray(post.tags)) {
              post.tags.forEach((tag) => tagsSet.add(tag))
            }
          })
          setAllTags(Array.from(tagsSet))
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

  return (
    <div className={styles.postDetailContainer}>
      <div className={styles.postNavigation}>
        <Link to="/posts" className={styles.backLink}>
          ← 모든 게시글
        </Link>
      </div>

      <div className={styles.postHero}>
        <div className={styles.postHeroContent}>
          <h1 className={styles.postTitle}>{post.title}</h1>

          <div className={styles.postMeta}>
            <div className={styles.postMetaLeft}>
              <div className={styles.authorInfo}>
                <div className={styles.authorAvatar}>
                  <span>{post.author ? post.author.charAt(0) : "A"}</span>
                </div>
                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>by {post.author || "Anonymous"}</span>
                  <div className={styles.postDetails}>
                    <time dateTime={post.date} className={styles.postDate}>
                      {formattedDate}
                    </time>
                    <span className={styles.postReadingTime}>{readingTime}분 소요</span>
                  </div>
                </div>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <Link key={tag} to={`/tags/${tag}`} className={styles.tagPill}>
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 커버 이미지 - 이미지가 없거나 로딩 실패 시 플레이스홀더 표시 */}
        <div className={styles.coverImageWrapper}>
          {post.coverImage && !imageError ? (
            <div className={styles.coverImageContainer}>
              <img
                src={post.coverImage || "/placeholder.svg"}
                alt={`${post.title} 커버 이미지`}
                className={styles.coverImage}
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <CoverPlaceholder title={post.title} />
          )}
        </div>
      </div>

      <div className={styles.postLayout}>
        <article className={styles.postDetail}>
          <div className={styles.postContent}>
            <MarkdownRenderer content={post.content} />
          </div>

          <div className={styles.postFooter}>
            {post.tags && post.tags.length > 0 && (
              <div className={styles.footerTags}>
                <h3 className={styles.footerTagsTitle}>태그</h3>
                <div className={styles.tagsList}>
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`/tags/${tag}`} className={styles.tag}>
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.postNavLinks}>
              <Link to="/posts" className={styles.backLink}>
                ← 게시글 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </article>

        <aside className={styles.postSidebar}>
          {/* 작성자 정보 */}
          {post.author && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>작성자</h3>
              <div className={styles.authorCard}>
                <div className={styles.authorAvatarLarge}>
                  <span>{post.author.charAt(0)}</span>
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{post.author}</h4>
                  <p className={styles.authorBio}>웹 개발과 프로그래밍에 관심이 많은 개발자입니다.</p>
                </div>
              </div>
            </div>
          )}

          {/* 목차 */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>목차</h3>
            <div className={styles.tableOfContents}>
              <ul className={styles.tocList}>
                <li className={styles.tocItem}>
                  <a href="#" className={styles.tocLink}>
                    소개
                  </a>
                </li>
                <li className={styles.tocItem}>
                  <a href="#" className={styles.tocLink}>
                    주요 내용
                  </a>
                  <ul>
                    <li className={styles.tocSubItem}>
                      <a href="#" className={styles.tocLink}>
                        첫 번째 섹션
                      </a>
                    </li>
                    <li className={styles.tocSubItem}>
                      <a href="#" className={styles.tocLink}>
                        두 번째 섹션
                      </a>
                    </li>
                  </ul>
                </li>
                <li className={styles.tocItem}>
                  <a href="#" className={styles.tocLink}>
                    결론
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 관련 포스트 */}
          {relatedPosts.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>관련 게시글</h3>
              <div className={styles.relatedPosts}>
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} to={`/posts/${relatedPost.slug}`} className={styles.relatedPostCard}>
                    {/* 관련 포스트 이미지 부분 수정 */}
                    <div className={styles.relatedPostImage}>
                      {relatedPost.coverImage ? (
                        <img
                          src={relatedPost.coverImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          onError={(e) => {
                            e.target.style.display = "none"
                            e.target.nextElementSibling.style.display = "block"
                          }}
                        />
                      ) : null}
                      <div style={{ display: relatedPost.coverImage ? "none" : "block" }}>
                        <ThumbnailPlaceholder title={relatedPost.title} />
                      </div>
                    </div>
                    <div className={styles.relatedPostInfo}>
                      <h4 className={styles.relatedPostTitle}>{relatedPost.title}</h4>
                      <time className={styles.relatedPostDate}>
                        {new Date(relatedPost.date).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 최근 게시글 */}
          {recentPosts.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>최근 게시글</h3>
              <ul className={styles.recentPostsList}>
                {recentPosts.map((recentPost) => (
                  <li key={recentPost.slug} className={styles.recentPostItem}>
                    <Link to={`/posts/${recentPost.slug}`} className={styles.recentPostLink}>
                      {recentPost.title}
                    </Link>
                    <time className={styles.recentPostDate}>
                      {new Date(recentPost.date).toLocaleDateString("ko-KR", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 태그 클라우드 */}
          {allTags.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>태그 클라우드</h3>
              <div className={styles.tagCloud}>
                {allTags.map((tag) => (
                  <Link key={tag} to={`/tags/${tag}`} className={styles.tagCloudItem}>
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 공유하기 */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>공유하기</h3>
            <div className={styles.shareButtons}>
              <button className={`${styles.shareButton} ${styles.twitter}`} aria-label="Twitter에 공유">
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
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </button>
              <button className={`${styles.shareButton} ${styles.facebook}`} aria-label="Facebook에 공유">
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
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className={`${styles.shareButton} ${styles.linkedin}`} aria-label="LinkedIn에 공유">
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
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
              <button className={`${styles.shareButton} ${styles.copy}`} aria-label="링크 복사">
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
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
