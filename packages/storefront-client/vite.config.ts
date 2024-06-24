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
    // rollupOptions: {
    //   external: [
    //     ...Object.keys(pkg.dependencies), // don't bundle dependencies
    //     /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
    //   ],
    // },
    target: "esnext", // transpile as little as possible
  },
  plugins: [dts()], // emit TS declaration files
});
