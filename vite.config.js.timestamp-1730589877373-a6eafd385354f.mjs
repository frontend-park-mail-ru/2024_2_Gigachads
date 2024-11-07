// vite.config.js
import { defineConfig } from "file:///mnt/d/vk_education/frontend/2024_2_Gigachads/node_modules/vite/dist/node/index.js";
import handlebarsPlugin from "file:///mnt/d/vk_education/frontend/2024_2_Gigachads/node_modules/@yoichiro/vite-plugin-handlebars/dist/index.js";
import { resolve } from "path";
import babel from "file:///mnt/d/vk_education/frontend/2024_2_Gigachads/node_modules/vite-plugin-babel/dist/index.mjs";
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
    }),
    babel({
      exclude: ["node_modules/**", "docs/**"]
    })
  ],
  server: {
    port: 80
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2QvdmtfZWR1Y2F0aW9uL2Zyb250ZW5kLzIwMjRfMl9HaWdhY2hhZHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvZC92a19lZHVjYXRpb24vZnJvbnRlbmQvMjAyNF8yX0dpZ2FjaGFkcy92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2QvdmtfZWR1Y2F0aW9uL2Zyb250ZW5kLzIwMjRfMl9HaWdhY2hhZHMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IGhhbmRsZWJhcnNQbHVnaW4gZnJvbSAnQHlvaWNoaXJvL3ZpdGUtcGx1Z2luLWhhbmRsZWJhcnMnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBiYWJlbCBmcm9tICd2aXRlLXBsdWdpbi1iYWJlbCc7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbi8vICAgcm9vdDogJ2ludGVncmF0aW9uJyxcclxuICBwbHVnaW5zOiBbXHJcbiAgICBoYW5kbGViYXJzUGx1Z2luKHtcclxuICAgICAgdGVtcGxhdGVGaWxlRXh0ZW5zaW9uOiAnLmhicycsXHJcbiAgICAgIHBhcnRpYWxzRGlyZWN0b3J5UGF0aDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgb3B0aW1pemVQYXJ0aWFsUmVnaXN0cmF0aW9uOiB0cnVlLFxyXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWxPcHRpb25zOiB7XHJcbiAgICAgICAgY29udGV4dDogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IGtleXdvcmQ6ICdzdGF0aWMnIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgJ3VwcGVyLWNhc2UnOiAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICBiYWJlbCh7XHJcbiAgICAgIGV4Y2x1ZGU6IFsnbm9kZV9tb2R1bGVzLyoqJywgJ2RvY3MvKionXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA4MFxyXG4gIH1cclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VCxTQUFTLG9CQUFvQjtBQUN0VixPQUFPLHNCQUFzQjtBQUM3QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxXQUFXO0FBSGxCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUEsRUFFMUIsU0FBUztBQUFBLElBQ1AsaUJBQWlCO0FBQUEsTUFDZix1QkFBdUI7QUFBQSxNQUN2Qix1QkFBdUIsUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDL0MsNkJBQTZCO0FBQUEsTUFDN0IsMkJBQTJCO0FBQUEsUUFDekIsU0FBUyxZQUFZO0FBQ25CLGlCQUFPLFFBQVEsUUFBUSxFQUFFLFNBQVMsU0FBUyxDQUFDO0FBQUEsUUFDOUM7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQLGNBQWMsQ0FBQyxRQUFRLElBQUksWUFBWTtBQUFBLFFBQ3pDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0osU0FBUyxDQUFDLG1CQUFtQixTQUFTO0FBQUEsSUFDeEMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
