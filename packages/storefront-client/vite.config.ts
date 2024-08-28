import { defineConfig } from "vite";
import pkg from "./package.json" assert { type: "json" };
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  server: {
    cors: false,
  },
  build: {
    lib: {
      name: "Shopify.StorefrontClient",
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies).filter(
          (key) => !key.startsWith("@tanstack")
        ),
        "@shopify/graphql-client",
      ],
      output: {
        name: "Shopify.StorefrontClient",
        // paths: (id) => {
        //   const version = pkg.dependencies[id]?.replace("^", "@");
        //   if (!version) return id;
        //   const url = `https://cdn.jsdelivr.net/npm/${id}${version}/+esm`;
        //   return url;
        // },
      },
    },
    target: "esnext", // transpile as little as possible
  },
  plugins: [dtsPlugin()], // emit TS declaration files
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
