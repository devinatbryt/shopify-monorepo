import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json" assert { type: "json" };
import path from "path";
import fs from "fs";

import { resolve } from "path";

const rootDir = resolve(__dirname);

export default defineConfig({
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "WebComponents",
      entry: Object.keys(pkg.exports).reduce(
        (entries, key) => {
          const name = key.replace("./", "");
          entries[`${name}/index`] = resolve(
            rootDir,
            `src/components/${name}/index.ts`
          );
          return entries;
        },
        {} as Record<string, string>
      ),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies),
        "solid-js/store",
        "solid-js/web",
        "solid-js/html",
      ],
      // output: {
      //   globals: {
      //     "@bryt-designs/storefront-client": "Shopify.StorefrontClient",
      //     "@bryt-designs/predictive-search":
      //       "Shopify.StorefrontPredictiveSearch",
      //   },
      // },
    },
    target: "esnext", // transpile as little as possible
  },
  plugins: [dts()],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
