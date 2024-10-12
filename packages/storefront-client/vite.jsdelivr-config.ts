import defineConfig, { dependencies } from "./vite.base-config";

const JS_DELIVR_URL_BASE = "https://cdn.jsdelivr.net/npm/";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        paths: (id) => {
          const version = dependencies[id]?.replace("^", "@");
          if (!version) return id;
          const url = `${JS_DELIVR_URL_BASE}${id}${version}/+esm`;
          return url;
        },
      },
    },
    outDir: "./dist/jsdelivr",
  },
});
