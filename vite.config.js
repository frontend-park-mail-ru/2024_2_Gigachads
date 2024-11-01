import { defineConfig } from 'vite';
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
//   root: 'integration',
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
        },
      },
    }),
  ],
  server: {
    port: 80
  }
});