"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./TableOfContents.module.css"
import PropTypes from "prop-types"

export default function TableOfContents({ content, containerRef }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const tocRef = useRef(null)

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
  }, [containerRef, content])

  // 스크롤 이벤트 처리 및 현재 활성 헤딩 감지
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target.offsetTop || 0) - (b.target.offsetTop || 0))
        const top = visible[0]
        if (top && top.target.id !== activeId) {
          setActiveId(top.target.id)
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px 0px 0px", // 헤더 높이 보정 (scroll-margin-top과 맞춤)
        threshold: 0.1,
      }
    )

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings, activeId])

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

      <div className={styles.tocContent}>
        <ul className={styles.tocList}>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${styles.tocItem} ${styles[`level${heading.level}`]} ${
                activeId === heading.id ? styles.active : ""
              }`}
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