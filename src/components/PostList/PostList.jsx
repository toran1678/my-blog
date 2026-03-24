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
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const [selectedTag, setSelectedTag] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const categories = ["전체", "개발", "일상", "알고리즘"]
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



  // URL의 tag 쿼리 변경 시 선택된 태그만 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tagParam = params.get("tag")
    setSelectedTag(tagParam)
    const pageParam = parseInt(params.get("page") || "1", 10)
    setCurrentPage(Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam)
  }, [location.search])

  // 선택된 카테고리, 태그, 검색어에 따라 포스트/태그 필터링
  useEffect(() => {
    let filtered = posts

    // 1. 카테고리 필터
    if (selectedCategory !== "전체") {
      filtered = filtered.filter(post => {
        const cat = post.category || ""
        if (selectedCategory === "개발") {
          return cat === "개발" || (!cat && post.tags && post.tags.some(t => ["React", "JavaScript", "Spring", "CSS", "Frontend", "Backend", "HTML", "Node.js"].includes(t)))
        }
        if (selectedCategory === "알고리즘") {
          return cat === "알고리즘" || (!cat && post.tags && post.tags.some(t => ["Algorithm", "BOJ", "Programmers", "Python", "Java", "C++"].includes(t)))
        }
        if (selectedCategory === "일상") {
          return cat === "일상" || (!cat && post.tags && post.tags.includes("Life"))
        }
        return false
      })
    }

    // 2. 가용한 태그 목록 업데이트 (선택된 카테고리에 속한 포스트들의 태그만)
    const tags = new Set()
    filtered.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => tags.add(tag))
      }
    })
    setAllTags(Array.from(tags).sort())

    // 3. 태그 필터 적용
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags && post.tags.includes(selectedTag))
    }
    
    setFilteredPosts(filtered)
    // ← URL에서 읽은 페이지를 보존하기 위해 여기서 currentPage를 리셋하지 않음
  }, [posts, selectedCategory, selectedTag])

  const handleImageError = (slug) => {
    setImageErrors((prev) => ({
      ...prev,
      [slug]: true,
    }))
  }

  // 태그 선택 시 필터링 및 URL 업데이트
  const handleTagSelect = (tag) => {
    setSelectedTag(tag)
    setCurrentPage(1)
    const params = new URLSearchParams(location.search)
    if (tag === null) {
      params.delete("tag")
    } else {
      params.set("tag", encodeURIComponent(tag))
    }
    params.delete("page")
    const query = params.toString()
    window.history.pushState({}, "", query ? `/my-blog/posts?${query}` : "/my-blog/posts")
  }

  // 페이지네이션 관련 계산
  const totalItems = filteredPosts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + pageSize)

  const updateUrlWithPage = (page) => {
    const params = new URLSearchParams(location.search)
    if (page <= 1) {
      params.delete("page")
    } else {
      params.set("page", String(page))
    }
    const query = params.toString()
    const base = "/my-blog/posts"
    window.history.pushState({}, "", query ? `${base}?${query}` : base)
  }

  const goToPage = (page) => {
    const next = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(next)
    updateUrlWithPage(next)
  }

  // 페이지 번호 목록 (슬라이딩 윈도우 + 엘립시스)
  const getPageNumbers = () => {
    const pages = []
    const windowSize = 5
    let start = Math.max(1, safeCurrentPage - Math.floor(windowSize / 2))
    let end = start + windowSize - 1
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - windowSize + 1)
    }

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push("...")
    }

    for (let p = start; p <= end; p++) pages.push(p)

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }
    return pages
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

      {/* 카테고리 필터 탭 */}
      <div className={styles.categoryTabs}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryTab} ${selectedCategory === cat ? styles.activeCategory : ""}`}
            onClick={() => {
              setSelectedCategory(cat)
              setCurrentPage(1)
              const params = new URLSearchParams(location.search)
              params.delete("page")
              params.delete("tag")
              const query = params.toString()
              window.history.pushState({}, "", query ? `/my-blog/posts?${query}` : "/my-blog/posts")
              handleTagSelect(null)
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {allTags.length > 0 && (
        <div className={styles.filterSection}>
          <div className={styles.filterHeader}>
            <h2 className={styles.filterTitle}>태그로 필터링</h2>
            <span className={styles.resultCountBadge}>{filteredPosts.length}개의 게시글</span>
          </div>
          <TagFilter
            tags={allTags}
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
          />
        </div>
      )}


      <div className={styles.postList}>
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => {
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
                    {/* 카테고리 뱃지 추가 */}
                    <div className={`${styles.postCategoryBadge} ${
                      post.category === "개발" ? styles.categorydev :
                      post.category === "알고리즘" ? styles.categoryalgo :
                      post.category === "일상" ? styles.categorylife :
                      styles.categorydefault
                    }`}>
                      {post.category || "개발"}
                    </div>
                    
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
                          {post.tags.slice(0, 2).map((tag) => (
                            <Link key={tag} to={`/posts?tag=${encodeURIComponent(tag)}`} className={styles.tag}>
                              {tag}
                            </Link>
                          ))}
                          {post.tags.length > 2 && (
                            <span className={styles.moreTags}>+{post.tags.length - 2}</span>
                          )}
                        </div>
                      )}

                      <Link to={`/posts/${post.slug}`} className={styles.readMore}>
                        더 읽기
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.readMoreIcon}
                        >
                          <path d="m9 18 6-6-6-6"/>
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
            <p className={styles.emptyMessage}>
              {selectedTag 
                ? "선택한 태그에 해당하는 게시글이 없습니다." 
                : "해당 카테고리에 게시글이 없습니다."}
            </p>
            <button className={styles.clearFilterButton} onClick={() => {
              handleTagSelect(null)
              setSelectedCategory("전체")
            }}>
              모든 게시글 보기
            </button>
          </div>
        )}
      </div>
      {totalItems > 0 && (
        <div className={styles.pagination}>
          <button className={styles.pageButton} onClick={() => goToPage(safeCurrentPage - 1)} disabled={safeCurrentPage === 1}>
            이전
          </button>
          <div className={styles.pageList}>
            {getPageNumbers().map((p, idx) =>
              typeof p === "number" ? (
                <button
                  key={p}
                  className={`${styles.pageNumber} ${p === safeCurrentPage ? styles.activePage : ""}`}
                  onClick={() => goToPage(p)}
                  aria-current={p === safeCurrentPage ? "page" : undefined}
                >
                  {p}
                </button>
              ) : (
                <span key={`ellipsis-${idx}`} className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              ),
            )}
          </div>
          <button
            className={styles.pageButton}
            onClick={() => goToPage(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  )
}
