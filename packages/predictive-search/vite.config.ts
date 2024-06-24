import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// import pkg from "./package.json" assert { type: "json" };

export default defineConfig({
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "Shopify.StorefrontPredictiveSearch",
      entry: "./src/index.ts",
      formats: ["es", "umd", "iife"],
    },
    rollupOptions: {
      external: ["@bryt-designs/storefront-client"],
      output: {
        globals: {
          "@bryt-designs/storefront-client": "Shopify.StorefrontClient",
        },
      },
    },
    target: "esnext", // transpile as little as possible
  },
  plugins: [dts()], // emit TS declaration files
});
