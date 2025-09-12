import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

export default defineConfig(({ mode }) => {
  const branch = process.env.BRANCH_NAME || 'current'
  const statsFilename = mode === 'analyze' 
    ? `./bundle-stats/stats-${branch}.html`
    : './dist/stats.html'
  
  return {
    plugins: [
      react(),
      visualizer({
        filename: statsFilename,
        open: mode === 'analyze',
        gzipSize: true,
        brotliSize: true,
        template: 'treemap', // or 'sunburst', 'network', 'raw-data', 'list'
      }),
    ],
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
    },
  }
})
