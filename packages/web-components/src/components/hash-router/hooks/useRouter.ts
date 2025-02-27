import {
  createRouter,
  type MatchFilters,
  type NavigateOptions,
  type Params,
  type SetParams,
} from "@solidjs/router";
import {
  type ICustomElement,
  createContext,
  provide,
  consume,
} from "component-register";
import { createMemo, untrack } from "solid-js";
import { createMatcher, expandOptionals, mergeSearchString } from "../utils.js";

type RouterContext = Parameters<
  NonNullable<Parameters<typeof createRouter>[0]["create"]>
>[0];

function createHashRouterContext(router: RouterContext) {
  return router;
}

const HashRouterContext = createContext(createHashRouterContext);

export const getHashRouterContextId = () => HashRouterContext.id;

export const provideRouterContext = (
  router: RouterContext,
  element: HTMLElement,
) => provide(HashRouterContext, router, element);

const useRouterContext = (element: ICustomElement & HTMLElement) => {
  const context: RouterContext = consume(HashRouterContext, element);
  if (!context) throw console.warn("useNavigate: No router context found");
  return context as RouterContext;
};

export const useNavigate = (element: ICustomElement & HTMLElement) => {
  const router = useRouterContext(element);
  return router.navigatorFactory();
};

export const useParams = <T extends Params>(
  element: ICustomElement & HTMLElement,
) => {
  const router = useRouterContext(element);
  return router.params as T;
};

export const useLocation = (element: ICustomElement & HTMLElement) => {
  const router = useRouterContext(element);
  return router.location;
};

export const useSearchParams = <T extends Params>(
  element: ICustomElement & HTMLElement,
) => {
  const location = useLocation(element);
  const navigate = useNavigate(element);
  const setSearchParams = (
    params: SetParams,
    options?: Partial<NavigateOptions>,
  ) => {
    const searchString = untrack(
      () => mergeSearchString(location.search, params) + location.hash,
    );
    navigate(searchString, {
      scroll: false,
      resolve: false,
      ...options,
    });
  };
  return [location.query as Partial<T>, setSearchParams];
};

export const useIsRouting = (element: ICustomElement & HTMLElement) => {
  const router = useRouterContext(element);
  return router.isRouting;
};

export const useMatch = <S extends string>(
  element: ICustomElement & HTMLElement,
  path: () => S,
  matchFilters?: MatchFilters<S>,
) => {
  const location = useLocation(element);
  const matchers = createMemo(() =>
    expandOptionals(path()).map((path) =>
      createMatcher(path, undefined, matchFilters),
    ),
  );
  return createMemo(() => {
    for (const matcher of matchers()) {
      const match = matcher(location.pathname);
      if (match) return match;
    }
  });
};

export const useCurrentMatches = (element: HTMLElement & ICustomElement) => {
  const router = useRouterContext(element);
  return router.matches;
};
