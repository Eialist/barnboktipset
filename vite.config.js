import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://barnboktipset.onrender.com",
  server: {
    proxy: {
      "/api": {
        target: "https://barnboktipset.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      }
    },
    host: true,
  }
})
