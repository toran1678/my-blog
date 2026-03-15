/* eslint-disable react/prop-types */
"use client"
import React, { useState, useMemo, memo } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { getImageUrl, debugImagePath } from "../../utils/placeholderImage"
import styles from "./MarkdownRenderer.module.css"

// 특별 콘텐츠 블록 (Admonition) 컴포넌트
const SpecialBlock = ({ dataType, children, title }) => {
  const iconMap = {
    note: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    ),
    tip: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"/>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
      </svg>
    ),
    important: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    warning: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    caution: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
  }

  return (
    <div className={`${styles.specialBlock} ${styles[`block-${dataType}`]}`}>
      <div className={`${styles.blockHeader} ${!title ? styles.noTitle : ""}`}>
        <span className={styles.blockIcon} aria-hidden="true">{iconMap[dataType]}</span>
        {title && <span className={styles.blockTitle}>{title}</span>}
      </div>
      <div className={styles.blockContent}>
        {children}
      </div>
    </div>
  )
}

function MarkdownRenderer({ content }) {
  const [copyNotification, setCopyNotification] = useState(false)

  // 일부 환경(IME/모바일 키보드)에서 전각 기호(＞, ＊ 등)가 들어오면 마크다운 문법으로 인식되지 않음
  const normalizeMarkdownSyntax = (md) => {
    if (!md) return md
    const zws = "\u200B"
    return (
      md
        .replace(/^\uFEFF/, "")
        .replace(/\uFF1E/g, ">")
        .replace(/\uFF0A/g, "*")
        .replace(/\uFF03/g, "#")
        .replace(/\uFF40/g, "`")
        .replace(/\uFF5E/g, "~")
        .replace(/(\p{L})\*\*/gu, `$1${zws}**`)
        .replace(/([)\]"!])\*\*/g, `$1${zws}**`)
        .replace(/\)\*\*(\p{L})/gu, `)**${zws}$1`)
    )
  }

  const processedContent = useMemo(
    () => (content ? normalizeMarkdownSyntax(content) : ""),
    [content]
  )

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
            const parseImageSize = (src) => {
              const decodedSrc = decodeURIComponent(src)
              const sizeMatch = decodedSrc.match(/^(.+?)(?:\||%7C)(\d+)$/)
              if (sizeMatch) {
                return { src: sizeMatch[1], width: parseInt(sizeMatch[2]) }
              }
              return { src: decodedSrc, width: null }
            }

            const { src: originalSrc, width: imageWidth } = parseImageSize(props.src)
            const imgSrc = getImageUrl(originalSrc)
            try { debugImagePath(originalSrc, imgSrc) } catch { /* noop */ }
            
            const getResponsiveImageStyle = (width) => {
              if (!width) return {}
              const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
              let maxWidth
              if (screenWidth <= 480) maxWidth = screenWidth - 32
              else if (screenWidth <= 768) maxWidth = Math.min(screenWidth - 32, 400)
              else if (screenWidth <= 1024) maxWidth = Math.min(screenWidth - 64, 600)
              else maxWidth = width
              
              const finalWidth = Math.min(width, maxWidth)
              return { maxWidth: `${finalWidth}px`, width: `${finalWidth}px`, height: 'auto' }
            }
            
            const imageStyle = getResponsiveImageStyle(imageWidth)
            return (
              <div className="markdown-image-container fancy">
                <div className="image-wrapper" style={imageStyle}>
                  <img
                    src={imgSrc}
                    alt={props.alt || "이미지"}
                    className="markdown-image"
                    style={imageStyle}
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      const placeholder = e.currentTarget.nextElementSibling
                      if (placeholder) placeholder.style.display = "flex"
                    }}
                  />
                  <div className="markdown-image-placeholder" style={{display: "none"}}>
                    <div className="placeholder-content">
                      <div className="placeholder-icon" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="placeholder-text">이미지를 표시할 수 없습니다</div>
                    </div>
                  </div>
                  {props.alt ? <div className="hover-caption">{props.alt}</div> : null}
                </div>
              </div>
            )
          },
          p: ({ node, children, ...props }) => {
            const hasInvalidChild = node?.children?.some?.((child) => 
              (child.type === "element" && child.tagName === "img") ||
              (child.type === "element" && child.tagName === "pre")
            )
            if (hasInvalidChild) return <div {...props}>{children}</div>
            return <p className={styles.paragraph} {...props}>{children}</p>
          },
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ""
            if (!inline) {
              const raw = String(children).replace(/\n$/, "")
              const isSingleLine = !raw.includes("\n")
              if (!language && isSingleLine) {
                return <code className={`${styles.inlineCode} ${styles.inlineCodeBlock}`} {...props}>{raw}</code>
              }
            }
            return !inline ? (
              <div className={styles.codeBlockContainer}>
                <div className={styles.codeHeader}>
                  <span className={styles.codeLanguage}>{language || "코드"}</span>
                  <button className={styles.copyButton} onClick={() => copyToClipboard(String(children).replace(/\n$/, ""))} aria-label="코드 복사">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>복사</span>
                  </button>
                </div>
                <SyntaxHighlighter style={oneDark} language={language} className={styles.codeBlock} showLineNumbers={true} wrapLines={true} lineProps={() => ({ className: "codeLine" })} {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={styles.inlineCode} {...props}>{children}</code>
            )
          },
          h1: ({ children, ...props }) => <Heading level={1} {...props}>{children}</Heading>,
          h2: ({ children, ...props }) => <Heading level={2} {...props}>{children}</Heading>,
          h3: ({ children, ...props }) => <Heading level={3} {...props}>{children}</Heading>,
          h4: ({ children, ...props }) => <Heading level={4} {...props}>{children}</Heading>,
          h5: ({ children, ...props }) => <Heading level={5} {...props}>{children}</Heading>,
          h6: ({ children, ...props }) => <Heading level={6} {...props}>{children}</Heading>,
          a: (props) => <a className={styles.link} target="_blank" rel="noopener noreferrer" {...props} />,
          
          blockquote: ({ children, ...props }) => {
            const childrenArray = React.Children.toArray(children)
            const firstChild = childrenArray.find(child => 
              React.isValidElement(child) && 
              (child.type === 'p' || child.props?.node?.tagName === 'p' || child.props?.className?.includes('paragraph'))
            )
            
            if (firstChild && firstChild.props && firstChild.props.children) {
              const pChildren = React.Children.toArray(firstChild.props.children)
              const firstContent = pChildren[0]
              
              if (typeof firstContent === 'string') {
                const alertMatch = firstContent.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*(.*))?/i)
                if (alertMatch) {
                  const type = alertMatch[1].toUpperCase()
                  const dataType = type.toLowerCase()
                  // 제목이 없으면 기본 라벨 사용 (Note, Tip 등)
                  const titleText = alertMatch[2] ? alertMatch[2].trim() : type.charAt(0) + dataType.slice(1)
                  
                  const remainingText = firstContent.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*(.*))?/i, "").trim()
                  
                  const processedFirstP = React.cloneElement(firstChild, {
                    children: [remainingText, ...pChildren.slice(1)]
                  })
                  
                  const otherChildren = childrenArray.filter(c => c !== firstChild)
                  const firstPChildren = React.Children.toArray(processedFirstP.props.children)

                  return (
                    <SpecialBlock dataType={dataType} title={titleText}>
                      {firstPChildren.some(c => typeof c === 'string' ? c.trim() !== "" : true) ? processedFirstP : null}
                      {otherChildren}
                    </SpecialBlock>
                  )
                }
              }
            }
            return <blockquote className={styles.blockquote} {...props}>{children}</blockquote>
          },
          div: ({ children, ...props }) => {
            const dataType = props['data-type']
            if (!dataType || !['note', 'tip', 'important', 'warning', 'caution'].includes(dataType)) {
              return <div {...props}>{children}</div>
            }
            return <SpecialBlock dataType={dataType}>{children}</SpecialBlock>
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

export default memo(MarkdownRenderer)
