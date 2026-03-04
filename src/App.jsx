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
import Intro from "./components/Intro/Intro"
import NotFound from "./components/NotFound/NotFound"
import SearchPage from "./pages/SearchPage/SearchPage"
import { useEffect } from "react"
import "./App.css"

// 스크롤 위치 초기화 컴포넌트
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // pathname이나 hash가 변경될 때마다 맨 위로(혹은 hash 위치로) 스크롤
    // setTimeout을 이용해 렌더링 후 스크롤을 강제함
    setTimeout(() => {
      if (!hash) {
        window.scrollTo(0, 0);
      } else {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      }
    }, 10);
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <Router 
        basename="/my-blog"
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<PostList />} />
            <Route path="posts/:slug" element={<PostDetail />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="about" element={<About />} />
            <Route path="intro" element={<Intro />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
