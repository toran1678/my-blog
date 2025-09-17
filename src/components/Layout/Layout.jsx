"use client"

import { Outlet, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import styles from "./Layout.module.css"

// 레이아웃 내부 컴포넌트
function LayoutContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // 페이지 변경 시 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // 현재 활성화된 링크 확인
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className={styles.appContainer}>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <span className={styles.logoText}>선빈's</span>
              <span className={styles.logoAccent}>Blog</span>
            </Link>
          </div>

          <div className={styles.themeToggleContainer}>
            <ThemeToggle />
          </div>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기/닫기"
          >
            <span className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ""}`}></span>
          </button>

          <nav className={`${styles.navigation} ${isMenuOpen ? styles.open : ""}`}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}>
                  Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/posts" className={`${styles.navLink} ${isActive("/posts") ? styles.active : ""}`}>
                  Posts
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/projects" className={`${styles.navLink} ${isActive("/projects") ? styles.active : ""}`}>
                  Projects
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/about" className={`${styles.navLink} ${isActive("/about") ? styles.active : ""}`}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <p className={styles.copyright}>© {new Date().getFullYear()} 선빈's Blog. All rights reserved.</p>
            <p className={styles.footerText}>React와 Vite로 제작된 포트폴리오 블로그입니다.</p>
          </div>
          <div className={styles.footerLinks}>
            <a
              href="https://github.com/toran1678"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
            <a href="mailto:toran16784@gmail.com" className={styles.socialLink}>
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 테마 프로바이더로 감싼 레이아웃 컴포넌트
export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  )
}
