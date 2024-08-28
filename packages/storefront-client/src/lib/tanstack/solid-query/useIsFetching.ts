import { createMemo, createSignal, onCleanup } from "solid-js";
import type { QueryFilters } from "@tanstack/query-core";
import type { QueryClient } from "./QueryClient";
import type { Accessor } from "solid-js";

export function useIsFetching(
  queryClient: Accessor<QueryClient>,
  filters?: Accessor<QueryFilters>
): Accessor<number> {
  const client = createMemo(() => queryClient());
  const queryCache = createMemo(() => client().getQueryCache());

  const [fetches, setFetches] = createSignal(client().isFetching(filters?.()));

  const unsubscribe = queryCache().subscribe(() => {
    setFetches(client().isFetching(filters?.()));
  });

  onCleanup(unsubscribe);

  return fetches;
}
