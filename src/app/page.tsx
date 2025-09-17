"use client"

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    // 루트 경로로 리다이렉트
    window.location.href = "/my-blog/"
  }, [])

  return null
}
