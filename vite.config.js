import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/my-blog/",
  // 개발 서버 설정 추가
  server: {
    open: "/my-blog/",
  },
})
