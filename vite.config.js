import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const iframeProxyPlugin = () => ({
  name: 'iframe-proxy',
  configureServer(server) {
    // Returning a fn here makes the middleware run BEFORE Vite's internal middleware
    return () => {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/iframe-proxy')) {
          return next()
        }

        const targetUrl = new URL(req.url, 'http://localhost').searchParams.get('url')
        if (!targetUrl) {
          res.statusCode = 400
          res.end('Missing url param')
          return
        }

        try {
          const upstream = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioProxy/1.0)' },
            redirect: 'follow',
          })

          // Strip headers that block iframe embedding
          const BLOCKED_HEADERS = ['x-frame-options', 'content-security-policy', 'x-content-type-options', 'content-length']
          upstream.headers.forEach((value, key) => {
            if (!BLOCKED_HEADERS.includes(key.toLowerCase())) {
              try { res.setHeader(key, value) } catch (_) {}
            }
          })

          res.statusCode = upstream.status

          const contentType = upstream.headers.get('content-type') || ''
          const body = await upstream.arrayBuffer()

          // For HTML responses, inject a <base> tag so relative URLs
          // (CSS, JS, images) resolve against the original site, not localhost
          if (contentType.includes('text/html')) {
            const origin = new URL(targetUrl).origin
            let html = new TextDecoder().decode(body)
            if (/<head[\s>]/i.test(html)) {
              html = html.replace(/(<head[^>]*>)/i, `$1<base href="${origin}/">`)
            } else {
              html = `<base href="${origin}/">${html}`
            }
            res.end(html)
          } else {
            res.end(Buffer.from(body))
          }
        } catch (err) {
          res.statusCode = 502
          res.end(`Proxy error: ${err.message}`)
        }
      })
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), iframeProxyPlugin()],
  appType: 'spa',
})
