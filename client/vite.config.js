/// <reference types="vitest" />
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
  test: {
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'dist/'],
    },
    environment: 'jsdom',
    globals: true,
    include: ['**/*.unit.test.[jt]s?(x)'],
    setupFiles: ['./tests/unit/vitest.setup.ts'],
  },
});
