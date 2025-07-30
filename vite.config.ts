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
        manualChunks(id) {
          // Vendor chunks - separate large libraries for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@apollo') || id.includes('graphql')) {
              return 'apollo-vendor';
            }
            if (id.includes('@segment')) {
              return 'analytics-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            // Other node_modules go to general vendor chunk
            return 'vendor';
          }
          
          // Application code chunks
          if (id.includes('src/analytics')) {
            return 'analytics';
          }
          
          if (id.includes('src/components')) {
            return 'components';
          }
          
          if (id.includes('src/apollo')) {
            return 'apollo-config';
          }
        },
      },
    },
  },
})
