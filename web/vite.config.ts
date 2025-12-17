import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: './build',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      treeshake: {
        preset: 'smallest',
        manualPureFunctions: [],
        moduleSideEffects: (id, external) => {
          if (id.includes('lucide-react')) {
            return true;
          }
          return 'no-external';
        }
      }
    }
  },
  optimizeDeps: {
    include: ['lucide-react'],
    esbuildOptions: {
      treeShaking: false
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
