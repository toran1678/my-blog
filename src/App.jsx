import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import About from "./components/About/About"
import ProjectList from "./components/ProjectList/ProjectList"
import ProjectDetail from "./components/ProjectDetail/ProjectDetail"
import PostList from "./components/PostList/PostList"
import PostDetail from "./components/PostDetail/PostDetail"
import TagProjects from "./components/TagProjects/TagProjects"
import NotFound from "./components/NotFound/NotFound"

// 디버깅 메시지 추가
console.log("App.jsx 렌더링 중...")

function App() {
  console.log("App 컴포넌트 실행 중...")
  return (
    <Router basename="/my-blog">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/:slug" element={<PostDetail />} />
          <Route path="tags/:tag" element={<TagProjects />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
