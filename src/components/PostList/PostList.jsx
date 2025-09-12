"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { getPosts } from "../../utils/markdownLoader"
import { ThumbnailPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import TagFilter from "../TagFilter/TagFilter"
import styles from "./PostList.module.css"

export default function PostList() {
  const location = useLocation()
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [allTags, setAllTags] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState(null)
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

  // 모든 포스트에서 고유한 태그 수집
  useEffect(() => {
    const tags = new Set()
    posts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => tags.add(tag))
      }
    })
    setAllTags(Array.from(tags).sort())
  }, [posts])

  // URL의 tag 쿼리 변경 시 선택된 태그만 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tagParam = params.get("tag")
    setSelectedTag(tagParam)
  }, [location.search])

  // 선택된 태그, 검색어, 포스트 목록에 따라 필터링
  useEffect(() => {
    let filtered = posts
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags && post.tags.includes(selectedTag))
    }
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase()
      filtered = filtered.filter((post) => (post.title || "").toLowerCase().includes(q))
    }
    setFilteredPosts(filtered)
  }, [posts, selectedTag, searchTerm])

  const handleImageError = (slug) => {
    setImageErrors((prev) => ({
      ...prev,
      [slug]: true,
    }))
  }

  // 태그 선택 시 필터링 및 URL 업데이트
  const handleTagSelect = (tag) => {
    setSelectedTag(tag)
    if (tag === null) {
      window.history.pushState({}, "", "/my-blog/posts")
    } else {
      window.history.pushState({}, "", `/my-blog/posts?tag=${encodeURIComponent(tag)}`)
    }
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

      {allTags.length > 0 && (
        <div className={styles.filterSection}>
          <h2 className={styles.filterTitle}>태그 + 제목으로 필터링</h2>
          <TagFilter
            tags={allTags}
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
            onSearchChange={setSearchTerm}
            filterTagsBySearch={false}
            searchPlaceholder="게시글 제목 검색..."
          />
        </div>
      )}

      {selectedTag && (
        <div className={styles.filterInfo}>
          <div className={styles.filterBadge}>
            <span className={styles.tagName}>{selectedTag}</span>
            <button className={styles.clearTagButton} onClick={() => handleTagSelect(null)} aria-label="태그 필터 제거">
              ×
            </button>
          </div>
          <p className={styles.resultText}>
            <span className={styles.resultCount}>{filteredPosts.length}개</span>의 게시글을 찾았습니다
          </p>
          {filteredPosts.length === 0 && (
            <button className={styles.clearFilterButton} onClick={() => handleTagSelect(null)}>
              모든 게시글 보기
            </button>
          )}
        </div>
      )}

      <div className={styles.postList}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const readingTime = calculateReadingTime(post.content || "")
            const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })

            return (
              <article key={post.slug} className={styles.postCard}>
                <div className={styles.postContent}>
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
                    </Link>
                  </div>

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
                      {post.tags && post.tags.length > 0 && (
                        <div className={styles.postTags}>
                          {post.tags.map((tag) => (
                            <Link key={tag} to={`/posts?tag=${encodeURIComponent(tag)}`} className={styles.tag}>
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}

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
            <p className={styles.emptyMessage}>선택한 태그에 해당하는 게시글이 없습니다.</p>
            <button className={styles.clearFilterButton} onClick={() => handleTagSelect(null)}>
              모든 게시글 보기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
