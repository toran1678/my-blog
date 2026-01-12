"use client"

import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"

export default function Utterances({ repo, issueTerm = "pathname", label, theme }) {
  const containerRef = useRef(null)
  const location = useLocation()
  const scriptRef = useRef(null)
  const themeRef = useRef(theme) // 현재 테마를 ref로 추적

  // 테마 변경 시 ref 업데이트
  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  // 스크립트 초기화 (경로 변경 시에만 재로드, 테마 변경 시에는 재로드하지 않음)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 컴포넌트가 언마운트되었는지 추적
    let isMounted = true

    // 기존 스크립트 제거
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current)
      scriptRef.current = null
    }

    // 컨테이너 초기화
    container.innerHTML = ""

    // 컨테이너가 여전히 DOM에 있는지 확인
    if (!container.parentNode) {
      return
    }

    // 새로운 스크립트 생성
    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("repo", repo)
    script.setAttribute("issue-term", issueTerm)
    if (label) script.setAttribute("label", label)
    script.setAttribute("theme", themeRef.current) // 초기 테마 설정
    // crossorigin 속성 제거 - GitHub OAuth 인증을 위해 필요함

    // 에러 핸들링
    script.onerror = () => {
      if (isMounted) {
        console.error("Utterances 스크립트를 로드하는 중 오류가 발생했습니다.")
      }
    }

    // 스크립트 로드 완료 후 컨테이너 존재 여부 확인
    script.onload = () => {
      if (!isMounted || !container.parentNode) {
        // 컴포넌트가 언마운트되었거나 컨테이너가 DOM에서 제거된 경우
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
        return
      }
    }

    // 컨테이너가 여전히 DOM에 있는지 다시 확인 후 추가
    if (container.parentNode) {
      container.appendChild(script)
      scriptRef.current = script
    }

    // 정리 함수
    return () => {
      isMounted = false
      
      // 스크립트 제거
      if (scriptRef.current) {
        try {
          if (scriptRef.current.parentNode) {
            scriptRef.current.parentNode.removeChild(scriptRef.current)
          }
        } catch {
          // 이미 제거된 경우 무시
        }
        scriptRef.current = null
      }
      
      // 컨테이너 초기화 (안전하게)
      if (container && container.parentNode) {
        try {
          container.innerHTML = ""
        } catch {
          // 이미 제거된 경우 무시
        }
      }
    }
  }, [repo, issueTerm, label, location.pathname]) // theme을 의존성에서 제거

  // 테마 변경 시 postMessage로만 테마 업데이트 (스크립트 재로드 없음)
  useEffect(() => {
    if (!containerRef.current) return
    const iframe = containerRef.current.querySelector("iframe.utterances-frame")
    if (!iframe) return

    // iframe이 완전히 로드된 후에 테마 변경 메시지 전송
    const sendThemeMessage = () => {
      try {
        iframe.contentWindow?.postMessage({ type: "set-theme", theme: themeRef.current }, "https://utteranc.es")
      } catch {
        // postMessage 실패 시 무시 (iframe이 아직 준비되지 않았을 수 있음)
      }
    }

    // iframe이 이미 로드되어 있으면 즉시 전송, 아니면 로드 이벤트 대기
    if (iframe.contentDocument?.readyState === "complete") {
      sendThemeMessage()
    } else {
      const handleLoad = () => {
        sendThemeMessage()
        iframe.removeEventListener("load", handleLoad)
      }
      iframe.addEventListener("load", handleLoad)
      
      // 타임아웃으로도 시도 (일부 경우 iframe이 로드 이벤트를 발생시키지 않을 수 있음)
      const timeoutId = setTimeout(() => {
        sendThemeMessage()
        iframe.removeEventListener("load", handleLoad)
      }, 1000)

      return () => {
        iframe.removeEventListener("load", handleLoad)
        clearTimeout(timeoutId)
      }
    }
  }, [theme])

  return <div ref={containerRef} />
}

Utterances.propTypes = {
  repo: PropTypes.string.isRequired,
  issueTerm: PropTypes.oneOf(["pathname", "url", "title", "og:title", "issue-number"]),
  label: PropTypes.string,
  theme: PropTypes.string.isRequired,
}


