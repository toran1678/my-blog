"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./TableOfContents.module.css"
import PropTypes from "prop-types"

export default function TableOfContents({ content, containerRef }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const tocRef = useRef(null)
  const tocContentRef = useRef(null)

  // 한글 포함 유니코드 안전 슬러그 생성
  const slugify = (text) => {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      // 결합 분음 기호 제거
      .replace(/[\u0300-\u036f]/g, "")
      // 글자/숫자/공백/하이픈만 허용 (유니코드 속성 사용)
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  // 실제 DOM에서 헤딩을 스캔해 목차 구성 (렌더 결과와 1:1 매칭)
  useEffect(() => {
    // DOM이 완전히 렌더링될 때까지 기다리기 위해 setTimeout 사용
    const timeoutId = setTimeout(() => {
      const root = containerRef?.current || document
      if (!root) return

      // 마크다운 본문 영역만 스캔
      const markdownRoot = root.querySelector('[data-markdown-root]') || root
      const headingEls = Array.from(markdownRoot.querySelectorAll("h1, h2, h3"))
      
      if (headingEls.length === 0) {
        setHeadings([])
        return
      }

      const usedIds = new Set()
      const next = headingEls.map((el) => {
        const level = Number(el.tagName.substring(1))
        const baseId = slugify(el.textContent || "")
        let uniqueId = baseId
        let counter = 1
        while (usedIds.has(uniqueId)) {
          uniqueId = `${baseId}-${counter}`
          counter++
        }
        usedIds.add(uniqueId)
        if (!el.id || el.id !== uniqueId) {
          el.id = uniqueId
        }
        return { id: uniqueId, text: el.textContent || "", level }
      })

      setHeadings(next)
      // DOM 변경 감지를 위한 옵저버 (이미지/코드 하이라이트 등으로 구조가 바뀔 때 보정)
      const mutationObserver = new MutationObserver(() => {
        const updatedEls = Array.from(markdownRoot.querySelectorAll("h1, h2, h3"))
        if (updatedEls.length !== headingEls.length) {
          const used = new Set()
          const nextHeads = updatedEls.map((el) => {
            const level = Number(el.tagName.substring(1))
            const baseId = slugify(el.textContent || "")
            let uniqueId = baseId
            let counter = 1
            while (used.has(uniqueId)) {
              uniqueId = `${baseId}-${counter}`
              counter++
            }
            used.add(uniqueId)
            if (!el.id || el.id !== uniqueId) el.id = uniqueId
            return { id: uniqueId, text: el.textContent || "", level }
          })
          setHeadings(nextHeads)
        }
      })
      mutationObserver.observe(markdownRoot, { childList: true, subtree: true })

      return () => mutationObserver.disconnect()
    }, 100) // 100ms 지연

    return () => clearTimeout(timeoutId)
  }, [containerRef, content])

  // 스크롤 이벤트 처리 및 현재 활성 헤딩 감지
  useEffect(() => {
    if (headings.length === 0) return

    let scrollTimeout
    let isScrolling = false

    const findActiveHeading = () => {
      const scrollY = window.scrollY
      const headerHeight = 80
      const currentPosition = scrollY + headerHeight + 20 // 헤더 아래 20px 지점
      
      const elements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean)
      
      if (elements.length === 0) return
      
      let activeHeading = null
      let minDistance = Infinity
      
      // 모든 헤딩을 확인하여 현재 위치에 가장 가까운 헤딩 찾기
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height
        
        // 헤딩이 현재 뷰포트에 보이는지 확인
        const isVisible = elementTop <= currentPosition && elementBottom > scrollY
        
        if (isVisible) {
          // 보이는 헤딩 중에서 현재 위치에 가장 가까운 것 선택
          const distance = Math.abs(elementTop - currentPosition)
          if (distance < minDistance) {
            minDistance = distance
            activeHeading = el
          }
        } else if (elementTop > currentPosition) {
          // 현재 위치보다 아래에 있는 헤딩이면, 이전 헤딩이 활성화되어야 함
          const distance = elementTop - currentPosition
          if (distance < minDistance) {
            minDistance = distance
            // 이전 헤딩을 찾기 위해 현재 인덱스에서 -1
            const currentIndex = elements.indexOf(el)
            if (currentIndex > 0) {
              activeHeading = elements[currentIndex - 1]
            }
          }
        }
      })
      
      // 활성 헤딩이 없으면 첫 번째 헤딩을 활성화
      if (!activeHeading && elements.length > 0) {
        activeHeading = elements[0]
      }
      
      if (activeHeading && activeHeading.id !== activeId) {
        console.log('목차 활성화:', {
          newActiveId: activeHeading.id,
          oldActiveId: activeId,
          scrollY: scrollY,
          currentPosition: currentPosition,
          headingText: activeHeading.textContent
        })
        setActiveId(activeHeading.id)
      }
    }

    // 스크롤 이벤트 핸들러 (throttle 적용)
    const handleScroll = () => {
      if (isScrolling) return
      
      isScrolling = true
      if (scrollTimeout) clearTimeout(scrollTimeout)
      
      scrollTimeout = setTimeout(() => {
        findActiveHeading()
        isScrolling = false
      }, 50) // 50ms throttle
    }

    // 초기 실행
    findActiveHeading()

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [headings]) // activeId 의존성 제거로 무한 루프 방지

  // 활성화된 목차 항목으로 자동 스크롤
  useEffect(() => {
    if (!activeId || !tocContentRef.current) return

    const activeElement = tocContentRef.current.querySelector(`[data-heading-id="${activeId}"]`)
    if (!activeElement) return

    const container = tocContentRef.current
    const containerRect = container.getBoundingClientRect()
    const elementRect = activeElement.getBoundingClientRect()

    // 활성 항목이 보이는 영역 밖에 있는지 확인
    const isOutOfView = 
      elementRect.top < containerRect.top || 
      elementRect.bottom > containerRect.bottom

    if (isOutOfView) {
      // 부드럽게 스크롤하여 활성 항목을 중앙에 위치
      const elementOffsetTop = activeElement.offsetTop
      const containerHeight = container.clientHeight
      const elementHeight = activeElement.clientHeight
      const scrollTop = elementOffsetTop - (containerHeight / 2) + (elementHeight / 2)

      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      })
    }
  }, [activeId])

  // 목차 항목 클릭 시 해당 섹션으로 스크롤
  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (!element) return

    // CSS의 scroll-margin-top을 활용해 자연스러운 스크롤
    element.scrollIntoView({ behavior: "smooth", block: "start" })

    if (window.innerWidth <= 1024) {
      setIsOpen(false)
    }
  }

  // 목차 토글 기능
  const toggleToc = () => {
    setIsOpen(!isOpen)
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={`${styles.tableOfContents} ${isOpen ? styles.open : styles.closed}`} ref={tocRef} aria-label="목차">
      <div className={styles.tocHeader} onClick={toggleToc}>
        <h2 className={styles.tocTitle}>
          목차
          <span className={styles.tocToggle}>{isOpen ? "▼" : "▲"}</span>
        </h2>
      </div>

      <div className={styles.tocContent} ref={tocContentRef}>
        <ul className={styles.tocList}>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${styles.tocItem} ${styles[`level${heading.level}`]} ${
                activeId === heading.id ? styles.active : ""
              }`}
              data-heading-id={heading.id}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={styles.tocLink}
                aria-current={activeId === heading.id ? "true" : "false"}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

TableOfContents.propTypes = {
  content: PropTypes.string,
  containerRef: PropTypes.shape({ current: PropTypes.any }),
}