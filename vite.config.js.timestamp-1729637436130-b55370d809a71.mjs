// vite.config.js
import { defineConfig } from "file:///mnt/d/vk_education/frontend/2024_2_Gigachads/node_modules/vite/dist/node/index.js";
import handlebarsPlugin from "file:///mnt/d/vk_education/frontend/2024_2_Gigachads/node_modules/@yoichiro/vite-plugin-handlebars/dist/index.js";
import { resolve } from "path";
import { build } from "vite";
var __vite_injected_original_dirname = "/mnt/d/vk_education/frontend/2024_2_Gigachads";
var vite_config_default = defineConfig({
  //   root: 'integration',
  plugins: [
    handlebarsPlugin({
      templateFileExtension: ".hbs",
      partialsDirectoryPath: resolve(__vite_injected_original_dirname, "src"),
      optimizePartialRegistration: true,
      transformIndexHtmlOptions: {
        context: async () => {
          return Promise.resolve({ keyword: "static" });
        },
        helpers: {
          "upper-case": (str) => str.toUpperCase()
        }
      }
    })
  ],
  server: {
    port: 80
  },
  build: {
    port: 80
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2QvdmtfZWR1Y2F0aW9uL2Zyb250ZW5kLzIwMjRfMl9HaWdhY2hhZHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvZC92a19lZHVjYXRpb24vZnJvbnRlbmQvMjAyNF8yX0dpZ2FjaGFkcy92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2QvdmtfZWR1Y2F0aW9uL2Zyb250ZW5kLzIwMjRfMl9HaWdhY2hhZHMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IGhhbmRsZWJhcnNQbHVnaW4gZnJvbSAnQHlvaWNoaXJvL3ZpdGUtcGx1Z2luLWhhbmRsZWJhcnMnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4vLyAgIHJvb3Q6ICdpbnRlZ3JhdGlvbicsXHJcbiAgcGx1Z2luczogW1xyXG4gICAgaGFuZGxlYmFyc1BsdWdpbih7XHJcbiAgICAgIHRlbXBsYXRlRmlsZUV4dGVuc2lvbjogJy5oYnMnLFxyXG4gICAgICBwYXJ0aWFsc0RpcmVjdG9yeVBhdGg6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgIG9wdGltaXplUGFydGlhbFJlZ2lzdHJhdGlvbjogdHJ1ZSxcclxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sT3B0aW9uczoge1xyXG4gICAgICAgIGNvbnRleHQ6IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBrZXl3b3JkOiAnc3RhdGljJyB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlbHBlcnM6IHtcclxuICAgICAgICAgICd1cHBlci1jYXNlJzogKHN0cikgPT4gc3RyLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA4MFxyXG4gIH1cclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VCxTQUFTLG9CQUFvQjtBQUN0VixPQUFPLHNCQUFzQjtBQUM3QixTQUFTLGVBQWU7QUFGeEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixTQUFTO0FBQUEsSUFDUCxpQkFBaUI7QUFBQSxNQUNmLHVCQUF1QjtBQUFBLE1BQ3ZCLHVCQUF1QixRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUMvQyw2QkFBNkI7QUFBQSxNQUM3QiwyQkFBMkI7QUFBQSxRQUN6QixTQUFTLFlBQVk7QUFDbkIsaUJBQU8sUUFBUSxRQUFRLEVBQUUsU0FBUyxTQUFTLENBQUM7QUFBQSxRQUM5QztBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ1AsY0FBYyxDQUFDLFFBQVEsSUFBSSxZQUFZO0FBQUEsUUFDekM7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
