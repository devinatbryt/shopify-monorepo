import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import codegen from "vite-plugin-graphql-codegen";
import { viteStaticCopy } from "vite-plugin-static-copy";
import pkg from "./package.json" assert { type: "json" };

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
      external: [
        ...Object.keys(pkg.dependencies),
        "solid-js/store",
        "solid-js/web",
      ],
    },
    target: "esnext", // transpile as little as possible
  },
  plugins: [
    codegen(),
    dts(),
    viteStaticCopy({
      targets: [
        {
          src: "./src/types/storefront.types.d.ts",
          dest: "./types",
        },
        {
          src: "./src/types/storefront.generated.d.ts",
          dest: "./types",
        },
      ],
    }),
  ], // emit TS declaration files
});
