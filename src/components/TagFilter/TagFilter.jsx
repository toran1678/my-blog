"use client"

import { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./TagFilter.module.css"

export default function TagFilter({
  tags,
  selectedTag,
  onTagSelect,
}) {
  const scrollRef = useRef(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)

  // 스크롤 위치에 따라 화살표 및 그라데이션 표시 여부 결정
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1) // 오차 대비 -1
    }
  }

  // 초기 렌더링 및 윈도우 리사이즈 시 스크롤 가능 여부 체크
  useEffect(() => {
    handleScroll()
    window.addEventListener("resize", handleScroll)
    return () => window.removeEventListener("resize", handleScroll)
  }, [tags])

  // 마우스 휠을 통한 가로 스크롤 (세로 스크롤 이벤트 방지 방식을 passive: false로 적용하기 위해 별도 추가)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (e) => {
      // 휠을 상하로 굴렸을 때만 좌우로 이동 (가로 휠이 되는 마우스 제외)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault() // 중요: 페이지의 상하 스크롤을 막음
        el.scrollLeft += e.deltaY * 1.5
      }
    }

    // preventDefault를 작동시키기 위해 passive: false 설정
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200 // 한 번 클릭 시 이동할 픽셀
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className={styles.tagFilterContainer}>
      <div className={`${styles.scrollWrapper} ${showLeftScroll ? styles.hasLeftGradient : ""} ${showRightScroll ? styles.hasRightGradient : ""}`}>
        
        {showLeftScroll && (
          <button 
            className={`${styles.scrollButton} ${styles.scrollLeft}`} 
            onClick={() => scroll("left")}
            aria-label="태그 이전으로 스크롤"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}

        <div 
          className={styles.tagList} 
          ref={scrollRef} 
          onScroll={handleScroll}
        >
          <button
            className={`${styles.tagButton} ${selectedTag === null ? styles.activeTag : ""}`}
            onClick={() => onTagSelect(null)}
          >
            전체
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagButton} ${selectedTag === tag ? styles.activeTag : ""}`}
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {showRightScroll && (
          <button 
            className={`${styles.scrollButton} ${styles.scrollRight}`} 
            onClick={() => scroll("right")}
            aria-label="태그 다음으로 스크롤"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        )}
      </div>
    </div>
  )
}

TagFilter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTag: PropTypes.string,
  onTagSelect: PropTypes.func.isRequired,
}

TagFilter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTag: PropTypes.string,
  onTagSelect: PropTypes.func.isRequired,
}
