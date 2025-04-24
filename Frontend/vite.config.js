import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssVite from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcssVite()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['d392-92-172-68-200.ngrok-free.app', 'localhost', '0.0.0.0']
  },

})