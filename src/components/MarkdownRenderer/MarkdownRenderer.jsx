"use client"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { ContentPlaceholder } from "../ImagePlaceholder/ImagePlaceholder"
import styles from "./MarkdownRenderer.module.css"

export default function MarkdownRenderer({ content }) {
  // 이미지 로딩 상태 관리
  const [imageStates, setImageStates] = useState({})

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

  return (
    <div className={styles.markdownContent}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // 헤딩 스타일링
          h1: ({ node, ...props }) => <h1 className={styles.heading1} {...props} />,
          h2: ({ node, ...props }) => <h2 className={styles.heading2} {...props} />,
          h3: ({ node, ...props }) => <h3 className={styles.heading3} {...props} />,
          h4: ({ node, ...props }) => <h4 className={styles.heading4} {...props} />,
          h5: ({ node, ...props }) => <h5 className={styles.heading5} {...props} />,
          h6: ({ node, ...props }) => <h6 className={styles.heading6} {...props} />,

          // 단락 스타일링
          p: ({ node, ...props }) => <p className={styles.paragraph} {...props} />,

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

            return (
              <div className={styles.imageContainer}>
                {src && imageState !== "error" ? (
                  <img
                    src={src || "/placeholder.svg"}
                    alt={alt}
                    className={styles.image}
                    onError={() => handleImageError(src)}
                    {...props}
                  />
                ) : (
                  <ContentPlaceholder title={alt || "이미지"} />
                )}
                {alt && <span className={styles.imageCaption}>{alt}</span>}
              </div>
            )
          },

          // 코드 블록 스타일링
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ""

            return !inline ? (
              <div className={styles.codeBlockContainer}>
                <div className={styles.codeHeader}>
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
                </div>
                <SyntaxHighlighter
                  style={atomDark}
                  language={language}
                  PreTag="div"
                  className={styles.codeBlock}
                  showLineNumbers={true}
                  wrapLines={true}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
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
        {content}
      </ReactMarkdown>
    </div>
  )
}
