import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'] // Optimize edilecek bağımlılıkları belirtin
  },
  build: {
    rollupOptions: {
      input: '/src/main.jsx', // Giriş noktanızı belirtin
    }
  }
});

