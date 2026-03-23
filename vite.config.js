import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/hobal-marketplace/",
  plugins: [react()],
});
