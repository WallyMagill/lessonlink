/* eslint-disable import/no-extraneous-dependencies */
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
