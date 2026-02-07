import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@gouv-widgets/shared': resolve(__dirname, '../../packages/shared/src'),
    }
  },
  server: {
    proxy: {
      '/albert-proxy': {
        target: 'https://albert.api.etalab.gouv.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/albert-proxy/, ''),
        secure: true,
      },
    }
  }
});
