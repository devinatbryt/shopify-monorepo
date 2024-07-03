export interface StorefrontQueries {
  [key: string]: {
    variables: any;
    return: any;
  };
  [key: number | symbol]: never;
}

export interface StorefrontMutations {
  [key: string]: {
    variables: any;
    return: any;
  };
  [key: number | symbol]: never;
}

export type GQLExtensions = Record<string, any>;
export interface FetchResponseBody<TData = any> {
  data?: TData;
  extensions?: GQLExtensions;
}

export interface ResponseErrors {
  networkStatusCode?: number;
  message?: string;
  graphQLErrors?: any[];
  response?: Response;
}
export interface ClientResponse<TData = any> extends FetchResponseBody<TData> {
  errors?: ResponseErrors;
}

export type StorefrontOperations = StorefrontQueries & StorefrontMutations;

export type CreateQueryFnOptions<QueryString extends string> = {
  query: QueryString;
  variables?: StorefrontOperations[QueryString]["variables"];
  signal?: AbortSignal;
};
