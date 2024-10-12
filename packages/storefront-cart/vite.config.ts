import defineConfig from "./vite.base-config";
import dts from "vite-plugin-dts";
import codegen from "vite-plugin-graphql-codegen";
import { viteStaticCopy } from "vite-plugin-static-copy";
//

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es", "cjs"],
    },
    outDir: "./dist/main",
  },
  plugins: [
    dts({ insertTypesEntry: false }),
    codegen(),
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
  ],
});
