import { defineConfig } from 'vite';
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import { resolve } from 'path';
import babel from 'vite-plugin-babel';
import { VitePWA } from 'vite-plugin-pwa';
import { equals } from './src/components/dumb/helper/helper.js';

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
        helpers: {
          'upper-case': (str) => str.toUpperCase(),
          'equals': equals,
        },
      },
    }),
    babel({
      exclude: ['node_modules/**', 'docs/**'],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style',
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 24 * 60 * 60, // 60 дней
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Gigachads App',
        short_name: 'Gigachads',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
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
    port: 80
  }
});