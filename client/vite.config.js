import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(), // React plugin for Vite
    tsconfigPaths(), // Resolve imports using TypeScript's path mapping
  ],
  root: path.resolve(__dirname), // Define root directory for the Vite project.
  server: {
    proxy: {
      // Proxy configuration for API calls
      '/api': 'http://localhost:3000',
    },
  },
});
