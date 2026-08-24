import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  build: { outDir: '../KSAS/KSAS_KSAS/ui', emptyOutDir: false },
  base: './',
  // Fixed port: the Google Maps browser key is restricted by HTTP referrer, so
  // the dev origin has to stay the one that is allow-listed. strictPort makes a
  // busy port fail loudly instead of silently sliding to another one.
  server: { port: 3000, strictPort: true },
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
