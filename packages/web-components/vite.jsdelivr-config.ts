import defineConfig from "./vite.base-config";
import dts from "vite-plugin-dts";

import { dependencies } from "./vite.base-config";

const JS_DELIVR_URL_BASE = "https://cdn.jsdelivr.net/npm/";

export default defineConfig({
  build: {
    // @ts-ignore
    lib: {
      formats: ["es"],
    },
    outDir: "./dist/jsdelivr",
    rollupOptions: {
      output: {
        paths: (id) => {
          if (dependencies[id] === "workspace:*") return id;
          const version = dependencies[id]?.replace("^", "@");
          if (!version) return id;
          const url = `${JS_DELIVR_URL_BASE}${id}${version}/+esm`;
          return url;
        },
      },
    },
  },
  plugins: [dts({ rollupTypes: false })],
});
