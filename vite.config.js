import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * Link previews (WhatsApp, Instagram, X, iMessage) need the full web address of the share image.
 * On Vercel the site's production address is filled in automatically at build time
 * (VERCEL_PROJECT_PRODUCTION_URL, e.g. your custom domain). VITE_SITE_URL overrides it if set.
 * Locally it falls back to a relative path, which is fine for previewing.
 */
function siteUrl() {
  const raw = process.env.VITE_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''
  if (!raw) return ''
  return (raw.startsWith('http') ? raw : `https://${raw}`).replace(/\/$/, '')
}

const shareTags = {
  name: 'plexo-share-tags',
  transformIndexHtml(html) {
    return html.replaceAll('%SITE_URL%', siteUrl())
  },
}

export default defineConfig({
  plugins: [react(), shareTags],
  // allowedHosts: lets phones on the same Wi-Fi open the preview by this PC's local name (e.g. NeelPeels-pc.local)
  server: { port: 3001, allowedHosts: ['.local'] }
})
