"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import styles from "./TagFilter.module.css"

export default function TagFilter({
  tags,
  selectedTag,
  onTagSelect,
  onSearchChange,
  filterTagsBySearch = true,
  searchPlaceholder = "태그 검색...",
  posts = [],
  showAutocomplete = false,
  itemType = "post", // "post" or "project"
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchContainerRef = useRef(null)
  const suggestionsRef = useRef(null)

  const handleChange = (value) => {
    setSearchTerm(value)
    if (onSearchChange) onSearchChange(value)
    setShowSuggestions(value.length > 0 && showAutocomplete)
    setHighlightedIndex(-1)
  }

  // 태그 검색 필터링 (옵션)
  const filteredTags = filterTagsBySearch
    ? tags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    : tags

  // 자동완성: 게시글/프로젝트 제목 검색만
  const getSuggestions = () => {
    if (!searchTerm || !showAutocomplete) return []
    
    const lowerSearchTerm = searchTerm.toLowerCase()
    const suggestions = []

    // posts 또는 projects (둘 다 동일한 구조 사용)
    const items = posts || []
    
    items.forEach((item) => {
      if (item.title && item.title.toLowerCase().includes(lowerSearchTerm)) {
        // slug 사용 (프로젝트와 포스트 모두 slug 사용)
        const identifier = item.slug || item.id || item.title.toLowerCase().replace(/\s+/g, "-")
        // 프로젝트인지 확인: posts prop이 전달되지 않았거나, 프로젝트 경로로 판단
        // ProjectList에서 전달할 때 구분할 수 있도록 하기 위해 프로젝트는 slug로 판단
        const isProject = itemType === "project"
        suggestions.push({
          type: "item",
          text: item.title,
          slug: identifier,
          isProject: isProject,
          onClick: () => {
            setSearchTerm("")
            setShowSuggestions(false)
          },
        })
      }
    })

    // 최대 10개로 제한
    return suggestions.slice(0, 10)
  }

  const suggestions = getSuggestions()

  // 외부 클릭 시 자동완성 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSuggestions])

  // 키보드 네비게이션
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          suggestions[highlightedIndex].onClick()
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setHighlightedIndex(-1)
        break
    }
  }

  // 스크롤 처리
  useEffect(() => {
    if (highlightedIndex >= 0 && suggestionsRef.current) {
      const highlightedElement = suggestionsRef.current.children[highlightedIndex]
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest", behavior: "smooth" })
      }
    }
  }, [highlightedIndex])

  return (
    <div className={styles.tagFilterContainer}>
      <div className={styles.searchContainer} ref={searchContainerRef}>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => searchTerm && showAutocomplete && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button className={styles.clearSearch} onClick={() => handleChange("")} aria-label="검색어 지우기">
            ×
          </button>
        )}

        {/* 자동완성 드롭다운 */}
        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.autocompleteDropdown} ref={suggestionsRef}>
            {suggestions.map((suggestion, index) => {
              const linkPath = suggestion.isProject 
                ? `/projects/${suggestion.slug}` 
                : `/posts/${suggestion.slug}`
              
              return (
                <Link
                  key={`item-${suggestion.slug}-${index}`}
                  to={linkPath}
                  className={`${styles.suggestionItem} ${index === highlightedIndex ? styles.highlighted : ""}`}
                  onClick={suggestion.onClick}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <svg
                    className={styles.suggestionIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span className={styles.suggestionText}>{suggestion.text}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <div className={styles.tagList}>
        <button
          className={`${styles.tagButton} ${selectedTag === null ? styles.activeTag : ""}`}
          onClick={() => onTagSelect(null)}
        >
          전체
        </button>

        {filteredTags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagButton} ${selectedTag === tag ? styles.activeTag : ""}`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}

        {filterTagsBySearch && filteredTags.length === 0 && searchTerm && !showAutocomplete && (
          <div className={styles.noTagsFound}>
            <p>&ldquo;{searchTerm}&rdquo;에 해당하는 태그가 없습니다.</p>
          </div>
        )}
        {!filterTagsBySearch && showAutocomplete && searchTerm && suggestions.length === 0 && (
          <div className={styles.noTagsFound}>
            <p>&ldquo;{searchTerm}&rdquo;에 해당하는 제목이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

TagFilter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTag: PropTypes.string,
  onTagSelect: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func,
  filterTagsBySearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  posts: PropTypes.array,
  showAutocomplete: PropTypes.bool,
  itemType: PropTypes.oneOf(["post", "project"]),
}
