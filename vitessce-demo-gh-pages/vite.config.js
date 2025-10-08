import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/vitessce-demo-gh-pages/', // pontosan ez, mert így van a repo neve
})
