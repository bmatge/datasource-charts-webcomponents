import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
        secure: true
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
  }
});
