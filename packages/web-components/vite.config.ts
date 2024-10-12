import defineConfig from "./vite.base-config";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    // @ts-ignore
    lib: {
      formats: ["es", "cjs"],
    },
    outDir: "./dist/main",
  },
  plugins: [dts({ rollupTypes: false })],
});
