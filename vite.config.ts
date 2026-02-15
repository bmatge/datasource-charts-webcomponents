import { defineConfig } from 'vite';
import { resolve } from 'path';
import { request as httpsRequest } from 'https';
import { request as httpRequest } from 'http';

export default defineConfig({
  esbuild: {
    keepNames: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GouvWidgets',
      fileName: (format) => `gouv-widgets.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      // Proxy pour Grist (docs.getgrist.com)
      '/grist-proxy': {
        target: 'https://docs.getgrist.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/grist-proxy/, ''),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('cookie');
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          });
        }
      },
      // Proxy pour Grist numerique.gouv.fr
      '/grist-gouv-proxy': {
        target: 'https://grist.numerique.gouv.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/grist-gouv-proxy/, ''),
        secure: true,
        configure: (proxy) => {
          // Supprimer les headers qui déclenchent l'erreur "Credentials not supported"
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('cookie');
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          });
        }
      },
      // Proxy pour Albert API (IA)
      '/albert-proxy': {
        target: 'https://albert.api.etalab.gouv.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/albert-proxy/, ''),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('cookie');
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          });
        }
      },
      // Proxy pour tabular-api.data.gouv.fr
      '/tabular-proxy': {
        target: 'https://tabular-api.data.gouv.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tabular-proxy/, ''),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('cookie');
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          });
        }
      },
      // Proxy générique pour les APIs externes
      '/api-proxy': {
        target: '',
        changeOrigin: true,
        secure: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Lire l'URL cible depuis le header X-Target-URL
            const targetUrl = req.headers['x-target-url'] as string;
            if (targetUrl) {
              try {
                const url = new URL(targetUrl);
                options.target = url.origin;
                proxyReq.path = url.pathname + url.search;
                proxyReq.setHeader('host', url.host);
              } catch (e) {
                console.error('Invalid target URL:', targetUrl);
              }
            }
          });
        }
      }
    }
  },
  plugins: [
    {
      name: 'ia-proxy',
      configureServer(server) {
        // Proxy IA generique : lit l'URL cible depuis le header X-Target-URL
        // et forwarde la requete cote serveur (contourne CORS + CSP)
        server.middlewares.use('/ia-proxy', (req, res) => {
          if (req.method === 'OPTIONS') {
            res.writeHead(204, {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Target-URL, x-api-key, anthropic-version',
            });
            res.end();
            return;
          }

          const targetUrl = req.headers['x-target-url'] as string;
          if (!targetUrl) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing X-Target-URL header' }));
            return;
          }

          let parsed: URL;
          try {
            parsed = new URL(targetUrl);
          } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid X-Target-URL' }));
            return;
          }

          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            const body = Buffer.concat(chunks);
            const isHttps = parsed.protocol === 'https:';
            const doRequest = isHttps ? httpsRequest : httpRequest;

            const skipHeaders = new Set(['host', 'connection', 'x-target-url', 'transfer-encoding', 'origin', 'referer']);
            const forwardHeaders: Record<string, string> = {};
            for (const [key, val] of Object.entries(req.headers)) {
              if (skipHeaders.has(key)) continue;
              if (val) forwardHeaders[key] = Array.isArray(val) ? val[0] : val;
            }
            forwardHeaders['host'] = parsed.host;
            if (body.length > 0) {
              forwardHeaders['content-length'] = String(body.length);
            }

            const proxyReq = doRequest({
              hostname: parsed.hostname,
              port: parsed.port || (isHttps ? 443 : 80),
              path: parsed.pathname + parsed.search,
              method: req.method,
              headers: forwardHeaders,
            }, (proxyRes) => {
              res.writeHead(proxyRes.statusCode || 500, {
                ...proxyRes.headers,
                'access-control-allow-origin': '*',
              });
              proxyRes.pipe(res);
            });

            proxyReq.on('error', (err) => {
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `Proxy error: ${err.message}` }));
            });

            if (body.length > 0) proxyReq.write(body);
            proxyReq.end();
          });
        });
      },
    },
  ],
});
