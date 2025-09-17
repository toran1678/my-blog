import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/variables.css"
import "./styles/global.css"
import "./styles/skillColors.css" // 기술 스택 색상 변수
import "./index.css"
import "./styles/darkMode.css" // 다크 모드 전역 스타일 추가
import App from "./App.jsx"

// 콘솔에 디버깅 메시지 추가
console.log("main.jsx 실행 중...")

const rootElement = document.getElementById("root")
if (rootElement) {
  console.log("root 요소를 찾았습니다.")
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  console.error("root 요소를 찾을 수 없습니다!")
}
