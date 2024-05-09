import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(), // React plugin for Vite
    tsconfigPaths(), // Resolve imports using TypeScript's path mapping
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(path.resolve(__dirname, 'tailwind.config.js')),
        require('autoprefixer'),
      ],
    },
  },
  root: path.resolve(__dirname), // Define root directory for the Vite project.
  server: {
    proxy: {
      // Proxy configuration for API calls
      '/api': 'http://localhost:3000',
    },
  },
});
