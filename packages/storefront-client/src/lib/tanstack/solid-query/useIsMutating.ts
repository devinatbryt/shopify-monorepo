import { createMemo, createSignal, onCleanup } from "solid-js";
import type { MutationFilters } from "@tanstack/query-core";
import type { QueryClient } from "./QueryClient";
import type { Accessor } from "solid-js";

export function useIsMutating(
  queryClient: Accessor<QueryClient>,
  filters?: Accessor<MutationFilters>
): Accessor<number> {
  const client = createMemo(() => queryClient?.());
  const mutationCache = createMemo(() => client().getMutationCache());

  const [mutations, setMutations] = createSignal(
    client().isMutating(filters?.())
  );

  const unsubscribe = mutationCache().subscribe((_result) => {
    setMutations(client().isMutating(filters?.()));
  });

  onCleanup(unsubscribe);

  return mutations;
}
