import {
  QueryClient,
  createQuery,
  createMutation,
  createQueries,
  type QueryKey,
  type DefaultError,
} from "@tanstack/solid-query";

import lz from "lz-string";

import { persistQueryClient } from "@tanstack/solid-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import * as GQLClient from "@shopify/graphql-client";

import { createStorefrontApiClient } from "@shopify/storefront-api-client";
export type {
  StorefrontApiClient,
  StorefrontQueries,
  StorefrontOperations,
  StorefrontMutations,
} from "@shopify/storefront-api-client";

export type Config = {
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
  GQLClient;
  const queryClient = new QueryClient();
  const client = createStorefrontApiClient({
    publicAccessToken: accessToken,
    storeDomain: shopDomain,
    apiVersion,
  });

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
    query: client.request,
    queryStream: client.requestStream,
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
    createMutation: <
      TData = unknown,
      TError = DefaultError,
      TVariables = void,
      TContext = unknown,
    >(
      options: Parameters<
        typeof createMutation<TData, TError, TVariables, TContext>
      >[0]
    ) =>
      createMutation<TData, TError, TVariables, TContext>(
        options,
        () => queryClient
      ),
    createQueries: (options: Parameters<typeof createQueries>[0]) =>
      createQueries(options, () => queryClient),
    useQueryClient: () => queryClient,
  };
}

if (typeof window.Shopify.StorefrontClient === "undefined")
  window.Shopify.StorefrontClient = StorefrontClient;

type StorefrontClientType = typeof StorefrontClient;

declare global {
  export var Shopify: Shopify;
  export interface Shopify {
    storefrontConfig: Config;
    StorefrontClient: StorefrontClientType;
  }
}
