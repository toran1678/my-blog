"use client"

import { useEffect, useRef } from "react"
import PropTypes from "prop-types"

export default function Utterances({ repo, issueTerm = "pathname", label, theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 이미 로드된 경우(테마 변경 등) 재삽입하지 않음
    const existingFrame = containerRef.current.querySelector("iframe.utterances-frame")
    if (existingFrame) return

    // SPA 라우팅에서 경로가 바뀔 때 재주입을 위해 초기화
    containerRef.current.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("repo", repo)
    script.setAttribute("issue-term", issueTerm)
    if (label) script.setAttribute("label", label)
    script.setAttribute("theme", theme)
    script.setAttribute("crossorigin", "anonymous")

    containerRef.current.appendChild(script)
  }, [repo, issueTerm, label, theme])

  // 테마는 재삽입 없이 iframe에 postMessage로 변경 가능
  useEffect(() => {
    if (!containerRef.current) return
    const iframe = containerRef.current.querySelector("iframe.utterances-frame")
    if (!iframe) return

    iframe.contentWindow?.postMessage({ type: "set-theme", theme }, "https://utteranc.es")
  }, [theme])

  return <div ref={containerRef} />
}

Utterances.propTypes = {
  repo: PropTypes.string.isRequired,
  issueTerm: PropTypes.oneOf(["pathname", "url", "title", "og:title", "issue-number"]),
  label: PropTypes.string,
  theme: PropTypes.string.isRequired,
}


