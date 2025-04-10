/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CryptoJsUtils',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['crypto-js'],
      output: {
        globals: {
          'crypto-js': 'CryptoJS',
        },
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      include: ['src'],
      exclude: ['**/*.spec.ts', '**/*.test.ts'],
    }),
  ],
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
