"use client"

import { Outlet, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import HeaderSearch from "../Search/HeaderSearch"
import styles from "./Layout.module.css"

// 레이아웃 내부 컴포넌트
function LayoutContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  useTheme()

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    setIsMenuOpen(false)
  }

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
    // 햄버거 메뉴에서 이동한 경우(메뉴가 열려있던 경우) 스크롤을 맨 위로
    if (isMenuOpen) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

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
            <Link to="/" className={styles.logoLink} onClick={handleLogoClick}>
              <span className={styles.logoText}>{"toran's"}</span>
              <span className={styles.logoAccent}>Blog</span>
            </Link>
          </div>

          <div className={styles.headerRight}>
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
                  <Link to="/intro" className={`${styles.navLink} ${isActive("/intro") ? styles.active : ""}`}>
                    About
                  </Link>
                </li>
              </ul>
            </nav>

            <div className={styles.headerControls}>
              <HeaderSearch />
              <div className={styles.themeToggleContainer}>
                <ThemeToggle />
              </div>
            </div>

            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기/닫기"
            >
              <span className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ""}`}></span>
            </button>
          </div>
        </div>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} {"toran's"} Blog. All rights reserved.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <a
              href="https://github.com/toran1678"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
              title="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/toran16784/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:toran16784@gmail.com"
              className={styles.socialLink}
              aria-label="Email"
              title="Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
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
