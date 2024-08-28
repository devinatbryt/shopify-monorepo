// vite.config.ts
import { defineConfig } from "file:///home/kookikodes/work/packages/bryt-components/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.8_terser@5.31.1/node_modules/vite/dist/node/index.js";
import dts from "file:///home/kookikodes/work/packages/bryt-components/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.8_rollup@4.18.0_typescript@5.4.5_vite@5.3.1_@types+node@20.14.8_terser@5.31.1_/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    cors: false
  },
  build: {
    lib: {
      name: "Shopify.StorefrontPredictiveSearch",
      entry: {
        index: "./src/index.ts"
      },
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["@bryt-designs/storefront-client"]
    },
    target: "esnext"
    // transpile as little as possible
  },
  plugins: [dts()]
  // emit TS declaration files
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rb29raWtvZGVzL3dvcmsvcGFja2FnZXMvYnJ5dC1jb21wb25lbnRzL3BhY2thZ2VzL3ByZWRpY3RpdmUtc2VhcmNoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9rb29raWtvZGVzL3dvcmsvcGFja2FnZXMvYnJ5dC1jb21wb25lbnRzL3BhY2thZ2VzL3ByZWRpY3RpdmUtc2VhcmNoL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2tvb2tpa29kZXMvd29yay9wYWNrYWdlcy9icnl0LWNvbXBvbmVudHMvcGFja2FnZXMvcHJlZGljdGl2ZS1zZWFyY2gvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG4vLyBpbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiIGFzc2VydCB7IHR5cGU6IFwianNvblwiIH07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIGNvcnM6IGZhbHNlLFxuICB9LFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgbmFtZTogXCJTaG9waWZ5LlN0b3JlZnJvbnRQcmVkaWN0aXZlU2VhcmNoXCIsXG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogXCIuL3NyYy9pbmRleC50c1wiLFxuICAgICAgfSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCJdLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcIkBicnl0LWRlc2lnbnMvc3RvcmVmcm9udC1jbGllbnRcIl0sXG4gICAgfSxcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsIC8vIHRyYW5zcGlsZSBhcyBsaXR0bGUgYXMgcG9zc2libGVcbiAgfSxcbiAgcGx1Z2luczogW2R0cygpXSwgLy8gZW1pdCBUUyBkZWNsYXJhdGlvbiBmaWxlc1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZZLFNBQVMsb0JBQW9CO0FBQzFhLE9BQU8sU0FBUztBQUdoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxJQUN2QjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLGlDQUFpQztBQUFBLElBQzlDO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUE7QUFDakIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
