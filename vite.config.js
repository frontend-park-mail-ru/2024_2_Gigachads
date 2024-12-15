import { defineConfig } from 'vite';
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import { resolve } from 'path';
import babel from 'vite-plugin-babel';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    handlebarsPlugin({
      templateFileExtension: '.hbs',
      partialsDirectoryPath: resolve(__dirname, 'src'),
      optimizePartialRegistration: true,
      transformIndexHtmlOptions: {
        context: async () => {
          return Promise.resolve({ keyword: 'static' });
        },
      },
    }),
    babel({
      exclude: ['node_modules/**', 'docs/**'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [resolve(__dirname, 'src')],
      },
    },
  },
  server: {
    port: 80,
  }
});