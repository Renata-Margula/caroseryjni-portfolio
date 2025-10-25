import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/caroseryjni-portfolio/",
  build: {
    outDir: 'docs', // build będzie w folderze docs
  },
})
