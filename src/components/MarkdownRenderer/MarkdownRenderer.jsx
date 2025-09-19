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
            // 이미지 크기 파싱 (|숫자 문법 지원)
            const parseImageSize = (src) => {
              // URL 디코딩 먼저 수행
              const decodedSrc = decodeURIComponent(src)
              
              // | 또는 %7C로 끝나는 패턴 매치
              const sizeMatch = decodedSrc.match(/^(.+?)(?:\||%7C)(\d+)$/)
              if (sizeMatch) {
                return {
                  src: sizeMatch[1], // | 앞의 부분
                  width: parseInt(sizeMatch[2])
                }
              }
              return { src: decodedSrc, width: null }
            }

            const { src: originalSrc, width: imageWidth } = parseImageSize(props.src)
            const imgSrc = getImageUrl(originalSrc)
            
            // 디버깅을 위한 로그 추가
            console.log('이미지 파싱 결과:', {
              originalSrc: props.src,
              parsedSrc: originalSrc,
              imageWidth: imageWidth,
              finalUrl: imgSrc
            })
            
            try { debugImagePath(originalSrc, imgSrc) } catch { /* noop */ }
            
            // 이미지 크기 스타일 적용 (모바일 반응형 고려)
            const getResponsiveImageStyle = (width) => {
              if (!width) return {}
              
              // 화면 너비에 따른 최대 크기 계산
              const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
              
              // 모바일/태블릿/데스크톱에 따른 최대 크기 설정
              let maxWidth
              if (screenWidth <= 480) {
                maxWidth = screenWidth - 32 // 작은 모바일: 16px 패딩씩
              } else if (screenWidth <= 768) {
                maxWidth = Math.min(screenWidth - 32, 400) // 모바일: 32px 패딩
              } else if (screenWidth <= 1024) {
                maxWidth = Math.min(screenWidth - 64, 600) // 태블릿: 64px 패딩
              } else {
                maxWidth = width // 데스크톱: 설정된 크기 그대로
              }
              
              // 설정된 크기와 화면 크기 중 작은 값 선택
              const finalWidth = Math.min(width, maxWidth)
              
              return {
                maxWidth: `${finalWidth}px`,
                width: `${finalWidth}px`,
                height: 'auto'
              }
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
                      console.error('이미지 로드 실패:', imgSrc)
                      e.currentTarget.style.display = "none"
                      const placeholder = e.currentTarget.nextElementSibling
                      if (placeholder) placeholder.style.display = "flex"
                    }}
                  />
                  <div className="markdown-image-placeholder" style={{display: "none"}}>
                    <div className="placeholder-content">
                      <div className="placeholder-icon" aria-hidden="true">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide-image-icon">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/>
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
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
            // 자식 요소 중에 이미지나 코드 블록이 있는지 확인
            const hasInvalidChild = node?.children?.some?.((child) => 
              (child.type === "element" && child.tagName === "img") ||
              (child.type === "element" && child.tagName === "pre")
            )

            // 이미지나 코드 블록이 있는 경우 p 태그 대신 div 사용
            if (hasInvalidChild) {
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
          blockquote: ({ children, ...props }) => <blockquote className={styles.blockquote} {...props}>{children}</blockquote>,
          
          // 어드모니션 블록 - data-type 속성으로 타입 결정
          div: ({ children, ...props }) => {
            const dataType = props['data-type']
            
            // 일반 div는 그대로 처리
            if (!dataType || !['note', 'tip', 'important', 'warning', 'caution'].includes(dataType)) {
              return <div {...props}>{children}</div>
            }

            const titleMap = {
              note: 'Note',
              tip: 'Tip', 
              important: 'Important',
              warning: 'Warning',
              caution: 'Caution',
            }
            
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
                <div className={styles.blockHeader}>
                  <span className={styles.blockIcon} aria-hidden="true">{iconMap[dataType]}</span>
                  <span className={styles.blockTitle}>{titleMap[dataType]}</span>
                </div>
                <div className={styles.blockContent}>
                  {children}
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
