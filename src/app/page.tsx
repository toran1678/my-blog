"use client"

// 이 파일은 삭제하거나 다음과 같이 수정해야 합니다.
// Next.js 스타일의 page.tsx는 Vite 프로젝트에서 작동하지 않습니다.

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    // 루트 경로로 리다이렉트
    window.location.href = "/my-blog/"
  }, [])

  return null
}
