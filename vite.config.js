import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor core — React ecosystem (always needed)
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation engine (used on homepage but heavy)
          'vendor-motion': ['framer-motion'],
          // Icons library
          'vendor-icons': ['lucide-react'],
          // Admin-only heavy dependencies
          'vendor-charts': ['recharts'],
          'vendor-editor': ['react-quill'],
        }
      }
    },
    // Reduce warning threshold since we now have proper splitting
    chunkSizeWarningLimit: 300,
  }
})
