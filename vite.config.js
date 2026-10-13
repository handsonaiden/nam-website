import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'

// The full address of the live site, used for the WhatsApp/Instagram link preview.
// Vercel provides it automatically; set SITE_URL in Vercel only if you want to override it.
function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
  return ''
}

function socialPreview() {
  return {
    name: 'social-preview',
    // fill in the site address inside index.html
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('__SITE_URL__', siteUrl()),
    },
    // publish og.png (kept at the top level of the repo) at yoursite.com/og.png
    generateBundle() {
      if (existsSync('og.png')) {
        this.emitFile({ type: 'asset', fileName: 'og.png', source: readFileSync('og.png') })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), socialPreview()],
  base: '/',
})
