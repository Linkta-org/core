import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import TurboConsole from 'unplugin-turbo-console/vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(), // React plugin for Vite
    tsconfigPaths(), // Resolve imports using TypeScript's path mapping
    TurboConsole({
      prefix: `[Linkta]`,
      disableLaunchEditor: true,
    }),
    checker({
      typescript: true,
      overlay: false,
    }),
  ],
  root: path.resolve(__dirname), // Define root directory for the Vite project.
  css: {
    modules: {
      localsConvention: 'camelCase', // Configure CSS modules
    },
  },
  server: {
    proxy: {
      // Proxy configuration for API calls
      '/api': 'http://localhost:3000',
    },
  },
});
