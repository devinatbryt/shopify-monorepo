import defineConfig, { dependencies } from "./vite.base-config";

const JS_DELIVR_URL_BASE = "/npm/";

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
          if (id.startsWith("@") || !id.includes("/"))
            return `${JS_DELIVR_URL_BASE}${id}${version}/+esm`;
          const split_id = id.split("/");
          return `${JS_DELIVR_URL_BASE}${split_id.at(0)}${version}/${split_id.slice(1).join("/")}/+esm`;
        },
      },
    },
    outDir: "./dist/jsdelivr",
  },
});
