import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { plugin as markdown } from "vite-plugin-markdown"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), markdown({ mode: "react" })],
  base: "/my-blog/",
  server: {
    open: "/my-blog/",
  },
  assetsInclude: ["**/*.md"],
})
