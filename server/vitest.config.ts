import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.unit.test.[jt]s?(x)'],
    environment: 'node',
  },
});
