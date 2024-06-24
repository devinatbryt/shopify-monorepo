import type {
  SearchableField,
  PredictiveSearchLimitScope,
  PredictiveSearchType,
  SearchUnavailableProductsType,
} from "@shopify/hydrogen/storefront-api-types";

import StorefrontClient from "@bryt-designs/storefront-client";

import buildSuggestionQuery from "./utils/buildSuggestionQuery";
import { DEFAULT_FRAGMENTS, DEFAULT_QUERY_KEY } from "./utils/const";

type Variables = {
  query: string;
  limit?: number;
  scope?: PredictiveSearchLimitScope;
  types?: Array<PredictiveSearchType>;
  searchableFields?: Array<SearchableField>;
  unavailableProducts?: SearchUnavailableProductsType;
};

let client: ReturnType<typeof StorefrontClient>;

if (import.meta.env.MODE === "development") {
  client = StorefrontClient({
    accessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    shopDomain: import.meta.env.VITE_SHOPIFY_SHOP_DOMAIN,
    apiVersion: import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION,
  });
} else {
  client = StorefrontClient();
}

const StorefrontPredictiveSearch = {
  createSuggestionQuery: (
    variables: Variables | (() => Variables),
    fragments: string[] | (() => string[]) = DEFAULT_FRAGMENTS,
    key: string | (() => string) = DEFAULT_QUERY_KEY
  ) => {
    return client.createQuery(() => {
      const k = typeof key === "function" ? key() : key,
        f = typeof fragments === "function" ? fragments() : fragments;

      let v = typeof variables === "function" ? variables() : variables;

      v = {
        ...v,
        query: v?.query || "",
      };

      return {
        queryKey: [k, v, f],
        queryFn: async ({ queryKey, signal }) => {
          const [_, variables, fragments] = queryKey;
          const res = await client.query({
            query: buildSuggestionQuery(fragments as string[]),
            variables: variables as Variables,
            signal: signal,
          });

          return res?.data?.predictiveSearch;
        },
        initialData: {},
      };
    });
  },
  getSuggestionQueryState: (
    key: string | (() => string) = DEFAULT_QUERY_KEY
  ) => {
    return client
      .useQueryClient()
      .getQueryState(typeof key === "function" ? key() : (key as any));
  },
};

export default StorefrontPredictiveSearch;
