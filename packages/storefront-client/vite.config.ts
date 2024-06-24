import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json" assert { type: "json" };

export default defineConfig({
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "Shopify.StorefrontClient",
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "solid-js",
        "@tanstack/solid-query",
        "@tanstack/query-sync-storage-persister",
        "@tanstack/solid-query-persist-client",
        "lz-string",
      ],
      output: {
        name: "Shopify.StorefrontClient",
        // paths: (id) => {
        //   const version = pkg.dependencies[id]?.replace("^", "@");
        //   if (!version) return id;
        //   const url = `https://cdn.jsdelivr.net/npm/${id}${version}/+esm`;
        //   return url;
        // },
      },
    },
    target: "esnext", // transpile as little as possible
  },
  plugins: [dts()], // emit TS declaration files
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
