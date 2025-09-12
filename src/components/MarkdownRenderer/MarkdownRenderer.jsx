/* eslint-disable react/prop-types */
"use client"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
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

  // 콘텐츠 전처리
  useEffect(() => {
    if (!content) {
      setProcessedContent("")
      return
    }

    console.log("원본 마크다운 콘텐츠:", content.substring(0, 200) + "...")
    // 사전 치환 없이 원본을 그대로 넘겨 렌더러에서 처리
    setProcessedContent(content)
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
          img: (props) => {
            const imgSrc = getImageUrl(props.src)
            try { debugImagePath(props.src, imgSrc) } catch { /* noop */ }
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
                      <div className="placeholder-icon" aria-hidden="true">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="18" height="14" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <path d="M21 16l-5.5-5.5a1 1 0 0 0-1.4 0L9 15l-2-2-4 4"></path>
                        </svg>
                      </div>
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
            const hasImageChild = node?.children?.some?.((child) => child.type === "element" && child.tagName === "img")

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
          code: ({ inline, className, children, ...props }) => {
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
                  style={oneDark}
                  language={language}
                  className={styles.codeBlock}
                  showLineNumbers={true}
                  wrapLines={true}
                  lineProps={() => ({ className: "codeLine" })}
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
          h1: ({ children, ...props }) => (
            <Heading level={1} {...props}>{children}</Heading>
          ),
          h2: ({ children, ...props }) => (
            <Heading level={2} {...props}>{children}</Heading>
          ),
          h3: ({ children, ...props }) => (
            <Heading level={3} {...props}>{children}</Heading>
          ),
          h4: ({ children, ...props }) => (
            <Heading level={4} {...props}>{children}</Heading>
          ),
          h5: ({ children, ...props }) => (
            <Heading level={5} {...props}>{children}</Heading>
          ),
          h6: ({ children, ...props }) => (
            <Heading level={6} {...props}>{children}</Heading>
          ),
          a: (props) => <a className={styles.link} target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({ children, ...props }) => {
            // 특별한 블록 타입 감지
            const firstChild = children && children[0]
            let blockType = 'default'
            let processedChildren = children
            
            if (firstChild && firstChild.props && firstChild.props.children) {
              const firstText = typeof firstChild.props.children === 'string' 
                ? firstChild.props.children 
                : (Array.isArray(firstChild.props.children) 
                    ? firstChild.props.children[0] 
                    : '')
              
              if (typeof firstText === 'string') {
                const text = firstText.trim().toLowerCase()
                if (text.startsWith('[!note]')) {
                  blockType = 'note'
                  // [!note] 텍스트 제거
                  const newText = firstText.replace(/^\[!note\]\s*/i, '')
                  processedChildren = [
                    { ...firstChild, props: { ...firstChild.props, children: newText } },
                    ...children.slice(1)
                  ]
                } else if (text.startsWith('[!warning]')) {
                  blockType = 'warning'
                  const newText = firstText.replace(/^\[!warning\]\s*/i, '')
                  processedChildren = [
                    { ...firstChild, props: { ...firstChild.props, children: newText } },
                    ...children.slice(1)
                  ]
                } else if (text.startsWith('[!tip]')) {
                  blockType = 'tip'
                  const newText = firstText.replace(/^\[!tip\]\s*/i, '')
                  processedChildren = [
                    { ...firstChild, props: { ...firstChild.props, children: newText } },
                    ...children.slice(1)
                  ]
                } else if (text.startsWith('[!info]')) {
                  blockType = 'info'
                  const newText = firstText.replace(/^\[!info\]\s*/i, '')
                  processedChildren = [
                    { ...firstChild, props: { ...firstChild.props, children: newText } },
                    ...children.slice(1)
                  ]
                }
              }
            }

            if (blockType === 'default') {
              return <blockquote className={styles.blockquote} {...props}>{children}</blockquote>
            }

            return (
              <div className={`${styles.specialBlock} ${styles[`block-${blockType}`]}`} {...props}>
                <div className={styles.blockContent}>
                  {processedChildren}
                </div>
              </div>
            )
          },
          ul: (props) => <ul className={styles.unorderedList} {...props} />,
          ol: (props) => <ol className={styles.orderedList} {...props} />,
          li: (props) => <li className={styles.listItem} {...props} />,
          table: (props) => (
            <div className={styles.tableContainer}>
              <table className={styles.table} {...props} />
            </div>
          ),
          thead: (props) => <thead className={styles.tableHead} {...props} />,
          tbody: (props) => <tbody className={styles.tableBody} {...props} />,
          tr: (props) => <tr className={styles.tableRow} {...props} />,
          th: (props) => <th className={styles.tableHeader} {...props} />,
          td: (props) => <td className={styles.tableCell} {...props} />,
          hr: (props) => <hr className={styles.horizontalRule} {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>

      {copyNotification && <div className={styles.copyNotification}>코드가 복사되었습니다!</div>}
    </div>
  )
}
