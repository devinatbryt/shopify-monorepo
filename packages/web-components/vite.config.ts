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
          "src/accordion-block/index.ts"
        ),
        "gnav-header/index": resolve(rootDir, "src/gnav-header/index.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies),
        "solid-js/store",
        "solid-js/web",
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
