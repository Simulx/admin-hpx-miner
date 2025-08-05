import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './',
  appType: 'spa',
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    allowedHosts: ['.ngrok-free.app'],
    hmr: {
      clientPort: 443,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'ui': path.resolve(__dirname, './src/components/dashboard/ui'),
    },
  },
  define: {
    global: 'globalThis',
  },
})