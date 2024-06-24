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
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@bryt-designs/storefront-client"],
    },
    target: "esnext", // transpile as little as possible
  },
  plugins: [dts()], // emit TS declaration files
});
