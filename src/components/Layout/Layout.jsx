"use client"

import { Outlet, Link } from "react-router-dom"
import { useState } from "react"
import styles from "./Layout.module.css"

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">선빈's Blog</Link>
        </div>
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기/닫기"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
        <nav className={`${styles.navigation} ${isMenuOpen ? styles.open : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                홈
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
                프로젝트
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                소개
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} 선빈's Blog. All rights reserved.</p>
      </footer>
    </div>
  )
}
