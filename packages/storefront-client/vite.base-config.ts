import defu from "defu";
import { type UserConfig, defineConfig } from "vite";

import _pkg from "./package.json" assert { type: "json" };

export const dependencies = {
  ..._pkg.dependencies,
  "solid-js/store": _pkg.dependencies["solid-js"],
  "solid-js/web": _pkg.dependencies["solid-js"],
  "solid-js/html": _pkg.dependencies["solid-js"],
};

export const pkg = _pkg;

const baseConfig: Partial<UserConfig> = {
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "Shopify.StorefrontClient",
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(dependencies).filter(
          (key) => !key.startsWith("@tanstack/solid")
        ),
        "@shopify/graphql-client",
      ],
      output: {
        name: "Shopify.StorefrontClient",
      },
    },
    target: "esnext", // transpile as little as possible
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
};

export default (config: UserConfig) => defineConfig(defu(config, baseConfig));
