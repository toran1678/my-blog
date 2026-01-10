"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./TableOfContents.module.css"
import PropTypes from "prop-types"

export default function TableOfContents({ content, containerRef, className }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState("")
  const tocRef = useRef(null)
  const tocContentRef = useRef(null)
  const activeIdRef = useRef("")

  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

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
      // 요청사항: h1, h2만 목차로 사용
      const headingEls = Array.from(markdownRoot.querySelectorAll("h1, h2"))
      
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
        const updatedEls = Array.from(markdownRoot.querySelectorAll("h1, h2"))
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

    let rafId = 0

    const findActiveHeading = () => {
      const headerHeight = 80
      const thresholdTop = headerHeight + 20 // 뷰포트 상단 기준 임계점(헤더 아래 20px)
      
      const elements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean)
      
      if (elements.length === 0) return
      
      // thresholdTop 위로 올라온(이미 지난) 헤딩들 중 가장 아래(가장 최근) 것을 활성화
      const passed = elements.filter((el) => el.getBoundingClientRect().top <= thresholdTop)
      const nextActive = (passed.length ? passed[passed.length - 1] : elements[0])?.id

      if (nextActive && nextActive !== activeIdRef.current) {
        activeIdRef.current = nextActive
        setActiveId(nextActive)
      }
    }

    const handleScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        findActiveHeading()
      })
    }

    // 초기 실행
    findActiveHeading()

    // 어떤 요소에서 스크롤되든 잡히도록 capture로 등록 (scroll은 bubble되지 않음)
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("scroll", handleScroll, { capture: true })
      window.removeEventListener("resize", handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [headings])

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
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={`${styles.tableOfContents} ${className || ""}`} ref={tocRef} aria-label="목차">
      <ul className={styles.tocList} ref={tocContentRef}>
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
    </nav>
  )
}

TableOfContents.propTypes = {
  content: PropTypes.string,
  containerRef: PropTypes.shape({ current: PropTypes.any }),
  className: PropTypes.string,
}