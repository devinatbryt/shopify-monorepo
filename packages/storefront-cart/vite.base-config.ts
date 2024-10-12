import { type UserConfig, defineConfig } from "vite";
import defu from "defu";

import _pkg from "./package.json" assert { type: "json" };

export const dependencies = {
  ..._pkg.dependencies,
  "solid-js/store": _pkg.dependencies["solid-js"],
  "solid-js/web": _pkg.dependencies["solid-js"],
  "solid-js/html": _pkg.dependencies["solid-js"],
};

const baseConfig: Partial<UserConfig> = {
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "Shopify.StorefrontCart",
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: Object.keys(dependencies),
    },
    target: "esnext", // transpile as little as possible
  },
};

export default (config: UserConfig) => defineConfig(defu(config, baseConfig));
