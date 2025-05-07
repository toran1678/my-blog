"use client"

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import PostList from "./components/PostList/PostList"
import PostDetail from "./components/PostDetail/PostDetail"
import ProjectList from "./components/ProjectList/ProjectList"
import ProjectDetail from "./components/ProjectDetail/ProjectDetail"
import About from "./components/About/About"
import NotFound from "./components/NotFound/NotFound"
import { useEffect } from "react"
import "./App.css"

// 스크롤 위치 초기화 컴포넌트
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <Router basename="/my-blog">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<PostList />} />
            <Route path="posts/:slug" element={<PostDetail />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
