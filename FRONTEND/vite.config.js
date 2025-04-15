import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js', // Output main.jsx as main.js
        chunkFileNames: '[name].js'
      }
    }
  },
  plugins: [ tailwindcss(),react()],
})
