"use client"
import React, { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { ContentPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import { getImageUrl, replacePlaceholderUrls } from "../../utils/placeholderImage"
import styles from "./MarkdownRenderer.module.css"

export default function MarkdownRenderer({ content }) {
  // 이미지 로딩 상태 관리
  const [imageStates, setImageStates] = useState({})
  // 플레이스홀더 URL 변환된 콘텐츠
  const [processedContent, setProcessedContent] = useState(content)

  // 콘텐츠가 변경되면 플레이스홀더 URL 변환
  useEffect(() => {
    if (content) {
      const processed = replacePlaceholderUrls(content)
      setProcessedContent(processed)
    }
  }, [content])

  // 코드 복사 기능
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)

    // 복사 성공 알림 표시
    const notification = document.createElement("div")
    notification.className = styles.copyNotification
    notification.textContent = "코드가 복사되었습니다!"
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.classList.add(styles.fadeOut)
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 1500)
  }

  // 이미지 로딩 오류 처리
  const handleImageError = (src) => {
    setImageStates((prev) => ({
      ...prev,
      [src]: "error",
    }))
  }

  // 헤딩 텍스트로 ID 생성
  const generateId = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // 특수문자 제거
      .replace(/\s+/g, "-") // 공백을 하이픈으로 변경
  }

  // 헤딩 요소에 ID 직접 추가
  useEffect(() => {
    const addIdsToHeadings = () => {
      const headings = document.querySelectorAll(".markdownContent h1, .markdownContent h2, .markdownContent h3")
      const usedIds = new Set()

      headings.forEach((heading) => {
        if (!heading.id) {
          const id = generateId(heading.textContent)

          // 중복 ID 처리
          let uniqueId = id
          let counter = 1
          while (usedIds.has(uniqueId)) {
            uniqueId = `${id}-${counter}`
            counter++
          }

          usedIds.add(uniqueId)
          heading.id = uniqueId
        }
      })
    }

    // 마크다운이 렌더링된 후 ID 추가
    const timer = setTimeout(addIdsToHeadings, 100)
    return () => clearTimeout(timer)
  }, [processedContent])

  return (
    <div className={styles.markdownContent}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // 헤딩 스타일링 및 ID 추가
          h1: ({ node, children, ...props }) => {
            // 고유한 ID 생성을 위해 컴포넌트 내부에서는 ID를 생성하지 않고
            // useEffect에서 일괄적으로 처리하도록 변경
            return (
              <h1 className={styles.heading1} {...props}>
                {children}
              </h1>
            )
          },
          h2: ({ node, children, ...props }) => {
            return (
              <h2 className={styles.heading2} {...props}>
                {children}
              </h2>
            )
          },
          h3: ({ node, children, ...props }) => {
            return (
              <h3 className={styles.heading3} {...props}>
                {children}
              </h3>
            )
          },
          h4: ({ node, children, ...props }) => {
            const id = generateId(children.toString())
            return (
              <h4 id={id} className={styles.heading4} {...props}>
                {children}
              </h4>
            )
          },
          h5: ({ node, children, ...props }) => {
            const id = generateId(children.toString())
            return (
              <h5 id={id} className={styles.heading5} {...props}>
                {children}
              </h5>
            )
          },
          h6: ({ node, children, ...props }) => {
            const id = generateId(children.toString())
            return (
              <h6 id={id} className={styles.heading6} {...props}>
                {children}
              </h6>
            )
          },

          // 단락 스타일링
          p: ({ node, children, ...props }) => {
            // 자식 요소 중에 코드 블록이 있는지 확인
            const hasCodeBlock = React.Children.toArray(children).some(
              (child) => React.isValidElement(child) && child.type === "code" && !child.props.inline,
            )

            // 코드 블록이 있으면 div로 렌더링하여 중첩 오류 방지
            return hasCodeBlock ? (
              <div className={styles.paragraphWithCode} {...props}>
                {children}
              </div>
            ) : (
              <p className={styles.paragraph} {...props} />
            )
          },

          // 강조 스타일링
          strong: ({ node, ...props }) => <strong className={styles.strong} {...props} />,
          em: ({ node, ...props }) => <em className={styles.emphasis} {...props} />,

          // 인용구 스타일링
          blockquote: ({ node, ...props }) => <blockquote className={styles.blockquote} {...props} />,

          // 리스트 스타일링
          ul: ({ node, ...props }) => <ul className={styles.unorderedList} {...props} />,
          ol: ({ node, ...props }) => <ol className={styles.orderedList} {...props} />,
          li: ({ node, ...props }) => <li className={styles.listItem} {...props} />,

          // 링크 스타일링
          a: ({ node, ...props }) => <a className={styles.link} {...props} />,

          // 이미지 스타일링 - 이미지 로딩 실패 시 플레이스홀더 표시
          img: ({ node, src, alt, ...props }) => {
            const imageState = imageStates[src]
            // 플레이스홀더 URL 변환
            const processedSrc = src ? getImageUrl(src) : ""

            // 이미지 컨테이너를 span으로 변경하여 p 태그 내부에서도 유효하게 합니다
            return (
              <span className={styles.imageContainer}>
                {processedSrc && imageState !== "error" ? (
                  <img
                    src={processedSrc || "/placeholder.svg"}
                    alt={alt}
                    className={styles.image}
                    onError={() => handleImageError(src)}
                    {...props}
                  />
                ) : (
                  <span className={styles.placeholderWrapper}>
                    <ContentPlaceholder title={alt || "이미지"} />
                  </span>
                )}
                {alt && <span className={styles.imageCaption}>{alt}</span>}
              </span>
            )
          },

          // 코드 블록 스타일링
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ""

            return !inline ? (
              // 블록 코드는 p 태그 내부에 렌더링될 수 있으므로 span으로 변경하고 display: block 스타일 적용
              <span className={styles.codeBlockContainer}>
                <span className={styles.codeHeader}>
                  <span className={styles.codeLanguage}>{language || "코드"}</span>
                  <button
                    className={styles.copyButton}
                    onClick={() => copyToClipboard(String(children).replace(/\n$/, ""))}
                    aria-label="코드 복사"
                  >
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
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>복사</span>
                  </button>
                </span>
                <SyntaxHighlighter
                  style={atomDark}
                  language={language}
                  PreTag="span"
                  className={styles.codeBlock}
                  showLineNumbers={true}
                  wrapLines={true}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </span>
            ) : (
              <code className={styles.inlineCode} {...props}>
                {children}
              </code>
            )
          },

          // 테이블 스타일링
          table: ({ node, ...props }) => (
            <div className={styles.tableContainer}>
              <table className={styles.table} {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className={styles.tableHead} {...props} />,
          tbody: ({ node, ...props }) => <tbody className={styles.tableBody} {...props} />,
          tr: ({ node, ...props }) => <tr className={styles.tableRow} {...props} />,
          th: ({ node, ...props }) => <th className={styles.tableHeader} {...props} />,
          td: ({ node, ...props }) => <td className={styles.tableCell} {...props} />,

          // 수평선 스타일링
          hr: ({ node, ...props }) => <hr className={styles.horizontalRule} {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}
