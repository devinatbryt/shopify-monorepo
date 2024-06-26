import { shopifyApiProject, ApiType } from "@shopify/api-codegen-preset";
import type { IGraphQLConfig } from "graphql-config";

const LATEST_API_VERSION = "2024-04";

export default {
  schema: "https://shopify.dev/storefront-graphql-direct-proxy",
  documents: ["*.ts", "!node_modules"],
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: LATEST_API_VERSION,
      documents: ["./src/**/*.{js,ts,jsx,tsx}"],
      outputDir: "./src/types",
      module: "@bryt-designs/storefront-client",
    }),
  },
} as IGraphQLConfig;
