import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.ts',
    exclude: ['**/node_modules/**', '**/.git/**', '**/.next/**', '**/dist/**', '**/tmp/**'],
    globals: true,
  },
});
