"use client"

import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"

export default function Utterances({ repo, issueTerm = "pathname", label, theme }) {
  const containerRef = useRef(null)
  const location = useLocation()
  const scriptRef = useRef(null)

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
    script.setAttribute("theme", theme)
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
  }, [repo, issueTerm, label, theme, location.pathname])

  // 테마는 재삽입 없이 iframe에 postMessage로 변경 가능
  useEffect(() => {
    if (!containerRef.current) return
    const iframe = containerRef.current.querySelector("iframe.utterances-frame")
    if (!iframe) return

    // iframe이 완전히 로드된 후에 테마 변경 메시지 전송
    const handleLoad = () => {
      iframe.contentWindow?.postMessage({ type: "set-theme", theme }, "https://utteranc.es")
    }

    if (iframe.contentDocument?.readyState === "complete") {
      handleLoad()
    } else {
      iframe.addEventListener("load", handleLoad)
      return () => iframe.removeEventListener("load", handleLoad)
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


