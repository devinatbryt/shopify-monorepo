import {
  QueryClient,
  createQuery,
  createMutation,
  createQueries,
  type QueryKey,
  type DefaultError,
} from "@tanstack/solid-query";

import { persistQueryClient } from "@tanstack/solid-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import lz from "lz-string";

type Config = {
  accessToken: string;
  shopDomain: string;
  apiVersion: string;
  shouldPersist?: boolean;
  key?: string;
};

// @ts-ignore
if (typeof window.Shopify === "undefined") window.Shopify = {};

if (import.meta.env.MODE === "development") {
  window.Shopify.storefrontConfig = {
    accessToken: import.meta.env.VITE_SHOPIFY_SHOP_DOMAIN || "",
    apiVersion: import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION || "",
    shopDomain: import.meta.env.VITE_SHOPIFY_SHOP_DOMAIN || "",
  };
}

export default function StorefrontClient(
  {
    accessToken = window.Shopify?.storefrontConfig?.accessToken,
    shopDomain = window.Shopify?.storefrontConfig?.shopDomain,
    apiVersion = window.Shopify?.storefrontConfig?.apiVersion,
    shouldPersist = window.Shopify?.storefrontConfig?.shouldPersist || false,
    key = window?.Shopify?.storefrontConfig?.key || "storefront-client",
  }: Config = window?.Shopify?.storefrontConfig
) {
  const queryClient = new QueryClient();
  const createQueryFn = async ({
    query,
    variables = {},
    signal,
  }: {
    query: string;
    variables: Record<string, any>;
    signal: AbortSignal;
  }) => {
    const res = await fetch(
      `https://${shopDomain}/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": accessToken,
          Accept: "application/json",
        },
        signal: signal,
        body: JSON.stringify({ query, variables }),
      }
    );
    const jsonRes = await res.json();
    if (jsonRes?.errors) throw jsonRes.errors;
    return jsonRes;
  };

  if (shouldPersist) {
    persistQueryClient({
      queryClient,
      persister: createSyncStoragePersister({
        key: key,
        storage: window.localStorage,
        serialize: (data) => lz.compressToUTF16(JSON.stringify(data)),
        deserialize: (data) => JSON.parse(lz.decompressFromUTF16(data)),
      }),
    });
  }

  return {
    query: createQueryFn,
    createQuery: <
      TQueryFnData = unknown,
      TError = DefaultError,
      TData = TQueryFnData,
      TQueryKey extends QueryKey = QueryKey,
    >(
      options: Parameters<
        typeof createQuery<TQueryFnData, TError, TData, TQueryKey>
      >[0]
    ) =>
      createQuery<TQueryFnData, TError, TData, TQueryKey>(
        options,
        () => queryClient
      ),
    createMutation: (options: Parameters<typeof createMutation>[0]) =>
      createMutation(options, () => queryClient),
    createQueries: (options: Parameters<typeof createQueries>[0]) =>
      createQueries(options, () => queryClient),
    useQueryClient: () => queryClient,
  };
}

if (typeof window.Shopify.StorefrontClient === "undefined")
  window.Shopify.StorefrontClient = StorefrontClient;

declare global {
  interface Window {
    Shopify: {
      storefrontConfig: Config;
      StorefrontClient: typeof StorefrontClient;
    };
  }
}
