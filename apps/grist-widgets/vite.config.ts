import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        chart: resolve(__dirname, 'chart/index.html'),
        kpi: resolve(__dirname, 'kpi/index.html'),
        map: resolve(__dirname, 'map/index.html'),
        datalist: resolve(__dirname, 'datalist/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@gouv-widgets/shared': resolve(__dirname, '../../packages/shared/src'),
    }
  }
});
