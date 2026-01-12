"use client"

import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"

export default function Utterances({ repo, issueTerm = "pathname", label, theme }) {
  const containerRef = useRef(null)
  const location = useLocation()
  const scriptRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 기존 스크립트 제거
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current)
      scriptRef.current = null
    }

    // 컨테이너 초기화
    containerRef.current.innerHTML = ""

    // 새로운 스크립트 생성
    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("repo", repo)
    script.setAttribute("issue-term", issueTerm)
    if (label) script.setAttribute("label", label)
    script.setAttribute("theme", theme)
    // crossorigin 속성 제거 - GitHub OAuth 인증을 위해 필요함

    containerRef.current.appendChild(script)
    scriptRef.current = script

    // 정리 함수
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current)
        scriptRef.current = null
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
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


