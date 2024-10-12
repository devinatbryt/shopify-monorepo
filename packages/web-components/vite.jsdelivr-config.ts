import defineConfig from "./vite.base-config";
import dts from "vite-plugin-dts";

import { dependencies } from "./vite.base-config";

import clientPkg from "../storefront-client/package.json" assert { type: "json" };
import cartPkg from "../storefront-cart/package.json" assert { type: "json" };
import searchPkg from "../predictive-search/package.json" assert { type: "json" };

const JS_DELIVR_URL_BASE = "/npm/";

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
          if (dependencies[id] === "workspace:*") {
            const version = dependencies[id]?.replace(
              "workspace:*",
              clientPkg.name === id
                ? clientPkg.version
                : cartPkg.name === id
                  ? cartPkg.version
                  : searchPkg.name === id
                    ? searchPkg.version
                    : ""
            );
            if (!version) return id;
            if (id.startsWith("@") || !id.includes("/"))
              return `${JS_DELIVR_URL_BASE}${id}${version}/+esm`;
            const split_id = id.split("/");
            return `${JS_DELIVR_URL_BASE}${split_id.at(0)}${version}/${split_id.slice(1).join("/")}/+esm`;
          }

          const version = dependencies[id]?.replace("^", "@");
          if (!version) return id;
          return `${JS_DELIVR_URL_BASE}${id}${version}/+esm`;
        },
      },
    },
  },
  plugins: [dts({ rollupTypes: false })],
});
