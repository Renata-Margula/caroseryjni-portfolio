import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/caroseryjni-portfolio/', // <- konieczne dla GitHub Pages
})
