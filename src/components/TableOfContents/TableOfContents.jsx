"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./TableOfContents.module.css"

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const tocRef = useRef(null)

  // 마크다운 콘텐츠에서 헤딩 추출
  useEffect(() => {
    if (!content) return

    // 정규식으로 마크다운 헤딩 추출 (# 제목, ## 제목, ### 제목)
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const extractedHeadings = []
    const usedIds = new Set() // 이미 사용된 ID를 추적
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length // #의 개수로 레벨 결정
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // 특수문자 제거
        .replace(/\s+/g, "-") // 공백을 하이픈으로 변경

      // 중복 ID 처리
      let uniqueId = id
      let counter = 1
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`
        counter++
      }

      usedIds.add(uniqueId)

      extractedHeadings.push({
        id: uniqueId,
        text,
        level,
      })
    }

    setHeadings(extractedHeadings)

    // 페이지 로드 후 헤딩 요소에 ID 직접 추가
    setTimeout(() => {
      const headingElements = document.querySelectorAll("h1, h2, h3")
      const usedDomIds = new Set()

      headingElements.forEach((el) => {
        const id = el.textContent
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")

        // 중복 ID 처리
        let uniqueId = id
        let counter = 1
        while (usedDomIds.has(uniqueId)) {
          uniqueId = `${id}-${counter}`
          counter++
        }

        usedDomIds.add(uniqueId)
        el.id = uniqueId
      })
    }, 100)
  }, [content])

  // 스크롤 이벤트 처리 및 현재 활성 헤딩 감지
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const headingElements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean)

      if (headingElements.length === 0) return

      // 현재 화면에 보이는 헤딩 중 가장 위에 있는 것을 찾음
      const scrollPosition = window.scrollY + 150 // 헤더 높이 고려

      // 모든 헤딩 요소를 순회하며 현재 스크롤 위치보다 위에 있는 마지막 헤딩을 찾음
      let currentHeading = headingElements[0]

      for (const heading of headingElements) {
        if (heading.offsetTop <= scrollPosition) {
          currentHeading = heading
        } else {
          break
        }
      }

      if (currentHeading && currentHeading.id !== activeId) {
        setActiveId(currentHeading.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // 초기 로드 시 실행

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headings, activeId])

  // 목차 항목 클릭 시 해당 섹션으로 스크롤
  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      // 헤더 높이를 고려하여 스크롤 위치 조정
      const headerHeight = 100 // 헤더 높이 예상값
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // 모바일에서 목차 닫기
      if (window.innerWidth <= 1024) {
        setIsOpen(false)
      }
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
