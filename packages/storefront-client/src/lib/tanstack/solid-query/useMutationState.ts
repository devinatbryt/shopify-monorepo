import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { replaceEqualDeep } from "@tanstack/query-core";
import type {
  Mutation,
  MutationCache,
  MutationFilters,
  MutationState,
} from "@tanstack/query-core";
import type { Accessor } from "solid-js";
import type { QueryClient } from "./QueryClient";

type MutationStateOptions<TResult = MutationState> = {
  filters?: MutationFilters;
  select?: (mutation: Mutation) => TResult;
};

function getResult<TResult = MutationState>(
  mutationCache: MutationCache,
  options: MutationStateOptions<TResult>
): Array<TResult> {
  return mutationCache
    .findAll(options.filters)
    .map(
      (mutation): TResult =>
        (options.select ? options.select(mutation) : mutation.state) as TResult
    );
}

export function useMutationState<TResult = MutationState>(
  queryClient: Accessor<QueryClient>,
  options: Accessor<MutationStateOptions<TResult>> = () => ({})
): Accessor<Array<TResult>> {
  const client = createMemo(() => queryClient());
  const mutationCache = createMemo(() => client().getMutationCache());

  const [result, setResult] = createSignal(
    getResult(mutationCache(), options())
  );

  createEffect(() => {
    const unsubscribe = mutationCache().subscribe(() => {
      const nextResult = replaceEqualDeep(
        result(),
        getResult(mutationCache(), options())
      );
      if (result() !== nextResult) {
        setResult(nextResult);
      }
    });

    onCleanup(unsubscribe);
  });

  return result;
}
