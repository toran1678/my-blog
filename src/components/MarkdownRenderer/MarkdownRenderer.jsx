"use client"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { getImageUrl, debugImagePath } from "../../utils/placeholderImage"
import styles from "./MarkdownRenderer.module.css"

export default function MarkdownRenderer({ content }) {
  const [processedContent, setProcessedContent] = useState("")
  const [copyNotification, setCopyNotification] = useState(false)

  // 유니코드 안전 슬러그 (TOC와 동일 규칙)
  const slugify = (text) => {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  // React children -> plain text 추출
  const extractText = (node) => {
    if (typeof node === "string") return node
    if (typeof node === "number") return String(node)
    if (!node) return ""
    if (Array.isArray(node)) return node.map(extractText).join("")
    if (typeof node === "object" && node.props && node.props.children) {
      return extractText(node.props.children)
    }
    return ""
  }

  // 공통 헤딩 컴포넌트 (레벨별 클래스 및 id 부여)
  const Heading = ({ level, children, ...props }) => {
    const text = extractText(children)
    const id = slugify(text)
    const Tag = `h${level}`
    const classMap = {
      1: styles.heading1,
      2: styles.heading2,
      3: styles.heading3,
      4: styles.heading4,
      5: styles.heading5,
      6: styles.heading6,
    }
    return (
      <Tag id={id} className={classMap[level]} {...props}>
        {children}
      </Tag>
    )
  }

  // 콘텐츠 전처리a
  useEffect(() => {
    if (!content) {
      setProcessedContent("")
      return
    }

    console.log("원본 마크다운 콘텐츠:", content.substring(0, 200) + "...")

    // 이미지 경로 처리를 위한 정규식
    const processed = content
      // 마크다운 이미지 구문 처리: ![alt](src)
      .replace(/!\[(.*?)\]$$(.*?)$$/g, (match, alt, src) => {
        const newSrc = getImageUrl(src)
        console.log(`마크다운 이미지 변환: ${src} -> ${newSrc}`)
        debugImagePath(src, newSrc)
        // 이미지를 div로 감싸는 HTML 구문으로 변환
        return `<div class="markdown-image-container">
          <img src="${newSrc}" alt="${alt || "이미지"}" class="markdown-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="markdown-image-placeholder" style="display:none;">
            <div class="placeholder-content">
              <div class="placeholder-icon">🖼️</div>
              <div class="placeholder-text">${alt || "이미지를 불러올 수 없습니다"}</div>
            </div>
          </div>
          ${alt ? `<div class="markdown-image-caption">${alt}</div>` : ""}
        </div>`
      })
      // HTML img 태그 처리: <img src="..." alt="...">
      .replace(/<img\s+([^>]*?)src="([^"]*?)"([^>]*?)>/g, (match, before, src, after) => {
        const newSrc = getImageUrl(src)
        console.log(`HTML 이미지 변환: ${src} -> ${newSrc}`)
        debugImagePath(src, newSrc)
        return `<div class="markdown-image-container">
          <img ${before}src="${newSrc}"${after} class="markdown-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="markdown-image-placeholder" style="display:none;">
            <div class="placeholder-content">
              <div class="placeholder-icon">🖼️</div>
              <div class="placeholder-text">이미지를 불러올 수 없습니다</div>
            </div>
          </div>
        </div>`
      })

    console.log("처리된 마크다운 콘텐츠:", processed.substring(0, 200) + "...")
    setProcessedContent(processed)
  }, [content])

  // 코드 복사 기능
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
    setCopyNotification(true)
    setTimeout(() => setCopyNotification(false), 2000)
  }

  if (!processedContent) {
    return <div className={styles.loading}>콘텐츠를 불러오는 중...</div>
  }

  return (
    <div className={styles.markdownContent} data-markdown-root>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({node, ...props}) => {
            const imgSrc = getImageUrl(props.src)
            return (
              <div className="markdown-image-container fancy">
                <div className="image-wrapper">
                  <img
                    src={imgSrc}
                    alt={props.alt || "이미지"}
                    className="markdown-image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      const placeholder = e.currentTarget.nextElementSibling
                      if (placeholder) placeholder.style.display = "flex"
                    }}
                  />
                  <div className="markdown-image-placeholder" style={{display: "none"}}>
                    <div className="placeholder-content">
                      <div className="placeholder-icon">🖼️</div>
                      <div className="placeholder-text">
                        {props.alt || "이미지를 불러올 수 없습니다"}
                      </div>
                    </div>
                  </div>
                  {props.alt ? <div className="hover-caption">{props.alt}</div> : null}
                </div>
              </div>
            )
          },

          // p 태그 커스텀 처리
          p: ({ node, children, ...props }) => {
            // 자식 요소 중에 이미지가 있는지 확인
            const hasImageChild = node.children.some((child) => child.type === "element" && child.tagName === "img")

            // 이미지가 있는 경우 p 태그 대신 div 사용
            if (hasImageChild) {
              return <div {...props}>{children}</div>
            }

            return (
              <p className={styles.paragraph} {...props}>
                {children}
              </p>
            )
          },

          // 코드 블록
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

          // 기타 요소들은 기본 스타일 적용 + 헤딩에 id 부여
          h1: ({ node, children, ...props }) => (
            <Heading level={1} {...props}>{children}</Heading>
          ),
          h2: ({ node, children, ...props }) => (
            <Heading level={2} {...props}>{children}</Heading>
          ),
          h3: ({ node, children, ...props }) => (
            <Heading level={3} {...props}>{children}</Heading>
          ),
          h4: ({ node, children, ...props }) => (
            <Heading level={4} {...props}>{children}</Heading>
          ),
          h5: ({ node, children, ...props }) => (
            <Heading level={5} {...props}>{children}</Heading>
          ),
          h6: ({ node, children, ...props }) => (
            <Heading level={6} {...props}>{children}</Heading>
          ),
          a: ({ node, ...props }) => <a className={styles.link} target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className={styles.blockquote} {...props} />,
          ul: ({ node, ...props }) => <ul className={styles.unorderedList} {...props} />,
          ol: ({ node, ...props }) => <ol className={styles.orderedList} {...props} />,
          li: ({ node, ...props }) => <li className={styles.listItem} {...props} />,
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
          hr: ({ node, ...props }) => <hr className={styles.horizontalRule} {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>

      {copyNotification && <div className={styles.copyNotification}>코드가 복사되었습니다!</div>}
    </div>
  )
}
