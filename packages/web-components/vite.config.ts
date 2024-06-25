import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json" assert { type: "json" };

import { resolve } from "path";

const rootDir = resolve(__dirname);

export default defineConfig({
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "WebComponents",
      entry: {
        "accordion-block/index": resolve(
          rootDir,
          "src/accordion-block/index.js"
        ),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies),
      // output: {
      //   globals: {
      //     "@bryt-designs/storefront-client": "Shopify.StorefrontClient",
      //     "@bryt-designs/predictive-search":
      //       "Shopify.StorefrontPredictiveSearch",
      //   },
      // },
    },
    target: "esnext", // transpile as little as possible
    minify: "terser",
  },
  plugins: [dts()],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
