import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const OUT_DIR = '../KSAS/KSAS_KSAS/ui'

/** Dropped by `init-customui` — the one file here that Vite did not write. */
const KEEP = new Set(['.seamos-do-not-edit.md'])

/**
 * Clears the deploy directory before each build.
 *
 * Asset filenames carry a content hash, so an edited chunk is written under a
 * new name and the old one is left behind. Vite's own `emptyOutDir` would take
 * the do-not-edit marker with it, hence the hand-rolled sweep: without it the
 * directory accumulates whole dead builds and the FIF ships every one of them.
 */
function emptyDeployDir(): Plugin {
  return {
    name: 'seamos-empty-deploy-dir',
    apply: 'build',
    async buildStart() {
      const dir = fileURLToPath(new URL(OUT_DIR, import.meta.url))
      let entries: string[]
      try {
        entries = await readdir(dir)
      } catch {
        return // Nothing deployed yet.
      }
      await Promise.all(
        entries
          .filter((entry) => !KEEP.has(entry))
          .map((entry) =>
            rm(join(dir, entry), { force: true, recursive: true }),
          ),
      )
    },
  }
}

export default defineConfig({
  // `emptyOutDir` stays off so Vite does not warn about a deploy directory
  // outside the project root; `emptyDeployDir` clears it instead.
  build: { outDir: OUT_DIR, emptyOutDir: false },
  base: './',
  // Fixed port: the Google Maps browser key is restricted by HTTP referrer, so
  // the dev origin has to stay the one that is allow-listed. strictPort makes a
  // busy port fail loudly instead of silently sliding to another one.
  server: { port: 3000, strictPort: true },
  plugins: [
    emptyDeployDir(),
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
