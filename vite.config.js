import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Optimize production bundle
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
      format: {
        comments: false,
      }
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
        }
      }
    },
    // Target modern browsers
    target: 'ES2020',
    // Sourcemaps for debugging
    sourcemap: false,
  },
})