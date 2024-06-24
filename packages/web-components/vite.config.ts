import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { resolve } from "path";

const rootDir = resolve(__dirname);

export default defineConfig({
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "web-components",
      entry: [resolve(rootDir, "./src/accordion-block.js")],
      formats: ["cjs"],
    },
    rollupOptions: {
      external: [
        "@bryt-designs/storefront-client",
        "@bryt-designs/predictive-search",
      ],
      output: {
        globals: {
          "@bryt-designs/storefront-client": "Shopify.StorefrontClient",
          "@bryt-designs/predictive-search":
            "Shopify.StorefrontPredictiveSearch",
        },
      },
    },
    target: "esnext", // transpile as little as possible
  },
  plugins: [dts()], // emit TS declaration files
});
