import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// import pkg from "./package.json" assert { type: "json" };

export default defineConfig({
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "Shopify.StorefrontClient",
      entry: "./src/index.ts",
      formats: ["es", "umd", "iife"],
    },
    rollupOptions: {},
    target: "esnext", // transpile as little as possible
  },
  plugins: [dts()], // emit TS declaration files
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
