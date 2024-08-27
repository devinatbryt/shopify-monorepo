// vite.config.ts
import { defineConfig } from "file:///home/kookikodes/work/packages/bryt-components/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.8_terser@5.31.1/node_modules/vite/dist/node/index.js";
import dts from "file:///home/kookikodes/work/packages/bryt-components/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.8_rollup@4.18.0_typescript@5.4.5_vite@5.3.1_@types+node@20.14.8_terser@5.31.1_/node_modules/vite-plugin-dts/dist/index.mjs";

// package.json
var package_default = {
  name: "@bryt-designs/web-components",
  version: "0.8.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    preview: "vite preview"
  },
  files: [
    "dist"
  ],
  exports: {
    "./accordion-block": {
      import: "./dist/accordion-block/index.js",
      module: "./dist/accordion-block/index.cjs",
      types: "./src/accordion-block/index.d.ts"
    },
    "./gnav-header": {
      import: "./dist/gnav-header/index.js",
      module: "./dist/gnav-header/index.cjs",
      types: "./src/gnav-header/index.d.ts"
    },
    "./element-portal": {
      import: "./dist/element-portal/index.js",
      module: "./dist/element-portal/index.cjs",
      types: "./src/element-portal/index.d.ts"
    },
    "./drawer": {
      import: "./dist/drawer/index.js",
      module: "./dist/drawer/index.cjs",
      types: "./src/drawer/index.d.ts"
    }
  },
  dependencies: {
    "@bryt-designs/predictive-search": "workspace:*",
    "@bryt-designs/storefront-client": "workspace:*",
    "@bryt-designs/storefront-cart": "workspace:*",
    "@solid-primitives/event-listener": "^2.3.3",
    "body-scroll-lock-upgrade": "^1.1.0",
    "component-register": "^0.8.3",
    "focus-trap": "^7.5.4",
    motion: "^10.18.0",
    "observe-element-in-viewport": "^0.0.15",
    "solid-element": "^1.8.0",
    "solid-js": "^1.8.18",
    stickybits: "^3.7.11"
  },
  devDependencies: {
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^20.14.8",
    vite: "^5.3.1"
  }
};

// vite.config.ts
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/kookikodes/work/packages/bryt-components/packages/web-components";
var rootDir = resolve(__vite_injected_original_dirname);
var vite_config_default = defineConfig({
  server: {
    cors: false
  },
  build: {
    lib: {
      name: "WebComponents",
      entry: Object.keys(package_default.exports).reduce(
        (entries, key) => {
          const name = key.replace("./", "");
          entries[`${name}/index`] = resolve(
            rootDir,
            `src/components/${name}/index.ts`
          );
          return entries;
        },
        {}
      ),
      // entry: {
      //   "accordion-block/index": resolve(
      //     rootDir,
      //     "src/components/accordion-block/index.ts"
      //   ),
      //   "gnav-header/index": resolve(
      //     rootDir,
      //     "src/components/gnav-header/index.ts"
      //   ),
      //   "element-portal/index": resolve(
      //     rootDir,
      //     "src/components/element-portal/index.ts"
      //   ),
      //   "drawer/index": resolve(rootDir, "src/components/drawer/index.ts"),
      // },
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: [
        ...Object.keys(package_default.dependencies),
        "solid-js/store",
        "solid-js/web"
      ]
      // output: {
      //   globals: {
      //     "@bryt-designs/storefront-client": "Shopify.StorefrontClient",
      //     "@bryt-designs/predictive-search":
      //       "Shopify.StorefrontPredictiveSearch",
      //   },
      // },
    },
    target: "esnext"
    // transpile as little as possible
  },
  plugins: [dts()],
  define: {
    "process.env.NODE_ENV": '"production"'
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUva29va2lrb2Rlcy93b3JrL3BhY2thZ2VzL2JyeXQtY29tcG9uZW50cy9wYWNrYWdlcy93ZWItY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUva29va2lrb2Rlcy93b3JrL3BhY2thZ2VzL2JyeXQtY29tcG9uZW50cy9wYWNrYWdlcy93ZWItY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9rb29raWtvZGVzL3dvcmsvcGFja2FnZXMvYnJ5dC1jb21wb25lbnRzL3BhY2thZ2VzL3dlYi1jb21wb25lbnRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIiBhc3NlcnQgeyB0eXBlOiBcImpzb25cIiB9O1xuXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcblxuY29uc3Qgcm9vdERpciA9IHJlc29sdmUoX19kaXJuYW1lKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgY29yczogZmFsc2UsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBuYW1lOiBcIldlYkNvbXBvbmVudHNcIixcbiAgICAgIGVudHJ5OiBPYmplY3Qua2V5cyhwa2cuZXhwb3J0cykucmVkdWNlKFxuICAgICAgICAoZW50cmllcywga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGtleS5yZXBsYWNlKFwiLi9cIiwgXCJcIik7XG4gICAgICAgICAgZW50cmllc1tgJHtuYW1lfS9pbmRleGBdID0gcmVzb2x2ZShcbiAgICAgICAgICAgIHJvb3REaXIsXG4gICAgICAgICAgICBgc3JjL2NvbXBvbmVudHMvJHtuYW1lfS9pbmRleC50c2BcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgICAgICB9LFxuICAgICAgICB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gICAgICApLFxuICAgICAgLy8gZW50cnk6IHtcbiAgICAgIC8vICAgXCJhY2NvcmRpb24tYmxvY2svaW5kZXhcIjogcmVzb2x2ZShcbiAgICAgIC8vICAgICByb290RGlyLFxuICAgICAgLy8gICAgIFwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLWJsb2NrL2luZGV4LnRzXCJcbiAgICAgIC8vICAgKSxcbiAgICAgIC8vICAgXCJnbmF2LWhlYWRlci9pbmRleFwiOiByZXNvbHZlKFxuICAgICAgLy8gICAgIHJvb3REaXIsXG4gICAgICAvLyAgICAgXCJzcmMvY29tcG9uZW50cy9nbmF2LWhlYWRlci9pbmRleC50c1wiXG4gICAgICAvLyAgICksXG4gICAgICAvLyAgIFwiZWxlbWVudC1wb3J0YWwvaW5kZXhcIjogcmVzb2x2ZShcbiAgICAgIC8vICAgICByb290RGlyLFxuICAgICAgLy8gICAgIFwic3JjL2NvbXBvbmVudHMvZWxlbWVudC1wb3J0YWwvaW5kZXgudHNcIlxuICAgICAgLy8gICApLFxuICAgICAgLy8gICBcImRyYXdlci9pbmRleFwiOiByZXNvbHZlKHJvb3REaXIsIFwic3JjL2NvbXBvbmVudHMvZHJhd2VyL2luZGV4LnRzXCIpLFxuICAgICAgLy8gfSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCJdLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgLi4uT2JqZWN0LmtleXMocGtnLmRlcGVuZGVuY2llcyksXG4gICAgICAgIFwic29saWQtanMvc3RvcmVcIixcbiAgICAgICAgXCJzb2xpZC1qcy93ZWJcIixcbiAgICAgIF0sXG4gICAgICAvLyBvdXRwdXQ6IHtcbiAgICAgIC8vICAgZ2xvYmFsczoge1xuICAgICAgLy8gICAgIFwiQGJyeXQtZGVzaWducy9zdG9yZWZyb250LWNsaWVudFwiOiBcIlNob3BpZnkuU3RvcmVmcm9udENsaWVudFwiLFxuICAgICAgLy8gICAgIFwiQGJyeXQtZGVzaWducy9wcmVkaWN0aXZlLXNlYXJjaFwiOlxuICAgICAgLy8gICAgICAgXCJTaG9waWZ5LlN0b3JlZnJvbnRQcmVkaWN0aXZlU2VhcmNoXCIsXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyB9LFxuICAgIH0sXG4gICAgdGFyZ2V0OiBcImVzbmV4dFwiLCAvLyB0cmFuc3BpbGUgYXMgbGl0dGxlIGFzIHBvc3NpYmxlXG4gIH0sXG4gIHBsdWdpbnM6IFtkdHMoKV0sXG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnYuTk9ERV9FTlZcIjogJ1wicHJvZHVjdGlvblwiJyxcbiAgfSxcbn0pO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwiQGJyeXQtZGVzaWducy93ZWItY29tcG9uZW50c1wiLFxuICBcInZlcnNpb25cIjogXCIwLjguMFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGRcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIlxuICB9LFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIlxuICBdLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLi9hY2NvcmRpb24tYmxvY2tcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvYWNjb3JkaW9uLWJsb2NrL2luZGV4LmpzXCIsXG4gICAgICBcIm1vZHVsZVwiOiBcIi4vZGlzdC9hY2NvcmRpb24tYmxvY2svaW5kZXguY2pzXCIsXG4gICAgICBcInR5cGVzXCI6IFwiLi9zcmMvYWNjb3JkaW9uLWJsb2NrL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL2duYXYtaGVhZGVyXCI6IHtcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2duYXYtaGVhZGVyL2luZGV4LmpzXCIsXG4gICAgICBcIm1vZHVsZVwiOiBcIi4vZGlzdC9nbmF2LWhlYWRlci9pbmRleC5janNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL3NyYy9nbmF2LWhlYWRlci9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9lbGVtZW50LXBvcnRhbFwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9lbGVtZW50LXBvcnRhbC9pbmRleC5qc1wiLFxuICAgICAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvZWxlbWVudC1wb3J0YWwvaW5kZXguY2pzXCIsXG4gICAgICBcInR5cGVzXCI6IFwiLi9zcmMvZWxlbWVudC1wb3J0YWwvaW5kZXguZC50c1wiXG4gICAgfSxcbiAgICBcIi4vZHJhd2VyXCI6IHtcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2RyYXdlci9pbmRleC5qc1wiLFxuICAgICAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvZHJhd2VyL2luZGV4LmNqc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vc3JjL2RyYXdlci9pbmRleC5kLnRzXCJcbiAgICB9XG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBicnl0LWRlc2lnbnMvcHJlZGljdGl2ZS1zZWFyY2hcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQGJyeXQtZGVzaWducy9zdG9yZWZyb250LWNsaWVudFwiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAYnJ5dC1kZXNpZ25zL3N0b3JlZnJvbnQtY2FydFwiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAc29saWQtcHJpbWl0aXZlcy9ldmVudC1saXN0ZW5lclwiOiBcIl4yLjMuM1wiLFxuICAgIFwiYm9keS1zY3JvbGwtbG9jay11cGdyYWRlXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJjb21wb25lbnQtcmVnaXN0ZXJcIjogXCJeMC44LjNcIixcbiAgICBcImZvY3VzLXRyYXBcIjogXCJeNy41LjRcIixcbiAgICBcIm1vdGlvblwiOiBcIl4xMC4xOC4wXCIsXG4gICAgXCJvYnNlcnZlLWVsZW1lbnQtaW4tdmlld3BvcnRcIjogXCJeMC4wLjE1XCIsXG4gICAgXCJzb2xpZC1lbGVtZW50XCI6IFwiXjEuOC4wXCIsXG4gICAgXCJzb2xpZC1qc1wiOiBcIl4xLjguMThcIixcbiAgICBcInN0aWNreWJpdHNcIjogXCJeMy43LjExXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHJlcG8vdHlwZXNjcmlwdC1jb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTQuOFwiLFxuICAgIFwidml0ZVwiOiBcIl41LjMuMVwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1ksU0FBUyxvQkFBb0I7QUFDamEsT0FBTyxTQUFTOzs7QUNEaEI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULFNBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxPQUFTO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULHFCQUFxQjtBQUFBLE1BQ25CLFFBQVU7QUFBQSxNQUNWLFFBQVU7QUFBQSxNQUNWLE9BQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxpQkFBaUI7QUFBQSxNQUNmLFFBQVU7QUFBQSxNQUNWLFFBQVU7QUFBQSxNQUNWLE9BQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxvQkFBb0I7QUFBQSxNQUNsQixRQUFVO0FBQUEsTUFDVixRQUFVO0FBQUEsTUFDVixPQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1YsUUFBVTtBQUFBLE1BQ1YsUUFBVTtBQUFBLE1BQ1YsT0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsbUNBQW1DO0FBQUEsSUFDbkMsbUNBQW1DO0FBQUEsSUFDbkMsaUNBQWlDO0FBQUEsSUFDakMsb0NBQW9DO0FBQUEsSUFDcEMsNEJBQTRCO0FBQUEsSUFDNUIsc0JBQXNCO0FBQUEsSUFDdEIsY0FBYztBQUFBLElBQ2QsUUFBVTtBQUFBLElBQ1YsK0JBQStCO0FBQUEsSUFDL0IsaUJBQWlCO0FBQUEsSUFDakIsWUFBWTtBQUFBLElBQ1osWUFBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQiwyQkFBMkI7QUFBQSxJQUMzQixlQUFlO0FBQUEsSUFDZixNQUFRO0FBQUEsRUFDVjtBQUNGOzs7QURqREEsU0FBUyxlQUFlO0FBSnhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU0sVUFBVSxRQUFRLGdDQUFTO0FBRWpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixPQUFPLE9BQU8sS0FBSyxnQkFBSSxPQUFPLEVBQUU7QUFBQSxRQUM5QixDQUFDLFNBQVMsUUFBUTtBQUNoQixnQkFBTSxPQUFPLElBQUksUUFBUSxNQUFNLEVBQUU7QUFDakMsa0JBQVEsR0FBRyxJQUFJLFFBQVEsSUFBSTtBQUFBLFlBQ3pCO0FBQUEsWUFDQSxrQkFBa0IsSUFBSTtBQUFBLFVBQ3hCO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxDQUFDO0FBQUEsTUFDSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BZ0JBLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxJQUN2QjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsR0FBRyxPQUFPLEtBQUssZ0JBQUksWUFBWTtBQUFBLFFBQy9CO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUUY7QUFBQSxJQUNBLFFBQVE7QUFBQTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFBQSxFQUNmLFFBQVE7QUFBQSxJQUNOLHdCQUF3QjtBQUFBLEVBQzFCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
