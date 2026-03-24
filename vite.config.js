import { defineConfig } from 'vite';

export default defineConfig({
  base: '/anamnese-digital/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
});
