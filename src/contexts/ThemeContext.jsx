"use client"

import { createContext, useState, useEffect, useContext } from "react"

// 테마 컨텍스트 생성
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
})

// 테마 컨텍스트 훅
export const useTheme = () => useContext(ThemeContext)

// 테마 프로바이더 컴포넌트
export function ThemeProvider({ children }) {
  // 로컬 스토리지에서 테마 불러오기 또는 기본값 설정
  const [theme, setTheme] = useState("light") // 초기값을 light로 설정

  // 컴포넌트 마운트 시 로컬 스토리지에서 테마 불러오기
  useEffect(() => {
    // 클라이언트 사이드에서만 로컬 스토리지 접근
    const savedTheme = localStorage.getItem("theme")
    // 저장된 테마가 있으면 사용
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // 시스템 다크 모드 설정 확인
      setTheme("dark")
    }
  }, [])

  // 테마 변경 함수
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  // 테마 변경 시 HTML 및 body 클래스 업데이트
  useEffect(() => {
    // HTML 요소에 테마 클래스 추가
    document.documentElement.setAttribute("data-theme", theme)

    if (theme === "dark") {
      document.documentElement.classList.add("dark-theme")
      document.documentElement.classList.remove("light-theme")
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
    } else {
      document.documentElement.classList.add("light-theme")
      document.documentElement.classList.remove("dark-theme")
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    }

    // 디버깅을 위한 콘솔 로그
    console.log("Theme changed to:", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
