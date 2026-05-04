import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const iframeProxyPlugin = () => ({
  name: 'iframe-proxy',
  configureServer(server) {
    server.middlewares.use('/iframe-proxy', async (req, res) => {
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
        const BLOCKED_HEADERS = ['x-frame-options', 'content-security-policy', 'x-content-type-options']
        upstream.headers.forEach((value, key) => {
          if (!BLOCKED_HEADERS.includes(key.toLowerCase())) {
            res.setHeader(key, value)
          }
        })

        res.statusCode = upstream.status
        const body = await upstream.arrayBuffer()
        res.end(Buffer.from(body))
      } catch (err) {
        res.statusCode = 502
        res.end(`Proxy error: ${err.message}`)
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), iframeProxyPlugin()],
  appType: 'spa',
})
