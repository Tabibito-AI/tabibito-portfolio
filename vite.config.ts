import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  root: './client',
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    middlewareMode: false,
    allowedHosts: ['all'],
  },
})
