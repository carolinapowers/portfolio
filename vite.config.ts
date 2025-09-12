import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep React and React DOM together to avoid breaking dependencies
          'react-vendor': ['react', 'react-dom'],
          // Analytics can be separate since it's loaded conditionally
          'analytics': ['@segment/analytics-next'],
          // UI components can be separate
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-select', 'lucide-react'],
        },
      },
    },
  },
})
