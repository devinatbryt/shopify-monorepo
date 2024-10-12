import defineConfig from "./vite.base-config";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es", "cjs"],
    },
  },
  plugins: [dts({ rollupTypes: true })], // emit TS declaration files
});
