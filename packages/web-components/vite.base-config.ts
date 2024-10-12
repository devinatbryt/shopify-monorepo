import { type UserConfig, defineConfig } from "vite";

import defu from "defu";
import { resolve } from "path";

import _pkg from "./package.json" assert { type: "json" };

export const dependencies = {
  ..._pkg.dependencies,
  "solid-js/store": _pkg.dependencies["solid-js"],
  "solid-js/web": _pkg.dependencies["solid-js"],
  "solid-js/html": _pkg.dependencies["solid-js"],
};

const rootDir = resolve(__dirname);

const baseConfig: Partial<UserConfig> = {
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "WebComponents",
      entry: Object.keys(_pkg.exports).reduce(
        (entries, key) => {
          const name = key.replace("./", "");
          if (name.endsWith(".css")) return entries;
          entries[`${name}/index`] = resolve(
            rootDir,
            `./src/components/${name}/index.ts`
          );
          return entries;
        },
        {} as Record<string, string>
      ),
      formats: ["es"],
    },
    rollupOptions: {
      external: Object.keys(dependencies),
    },
    target: "esnext", // transpile as little as possible
  },
  plugins: [],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
};

export default (config: UserConfig) => defineConfig(defu(config, baseConfig));
