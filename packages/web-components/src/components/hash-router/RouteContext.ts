import {
  consume,
  createContext,
  ICustomElement,
  provide,
} from "component-register";
import {
  useNavigate as useNavigate_,
  useParams as useParams_,
  useSearchParams as useSearchParams_,
  useLocation as useLocation_,
  useIsRouting as useIsRouting_,
} from "@solidjs/router";
import { createMatcher, expandOptionals, MatchFilters } from "./utils";
import { createMemo } from "solid-js";

function initializeRouteContext() {
  const navigate = useNavigate_();
  const params = useParams_();
  const searchParams = useSearchParams_();
  const location = useLocation_();
  const isRouting = useIsRouting_();

  const isMatch = <S extends string>(
    path: S,
    matchFilters?: MatchFilters<S>
  ) => {
    const matchers = expandOptionals(path).map((path) =>
      createMatcher(path, undefined, matchFilters)
    );
    for (const matcher of matchers) {
      const match = matcher(location.pathname);
      if (match) return true;
    }
    return false;
  };

  return {
    navigate,
    params,
    searchParams,
    location,
    isRouting,
    isMatch,
  } as const;
}

const RouterContext = createContext(initializeRouteContext);

export const provideRouteContext = (element: ICustomElement & HTMLElement) => {
  return provide(RouterContext, {}, element);
};

export const useNavigate = (element: ICustomElement & HTMLElement) => {
  const context: RouteContextType = consume(RouterContext, element);
  if (!context) throw console.warn("useNavigate: No router context found");
  return context.navigate;
};

export const useParams = (element: ICustomElement & HTMLElement) => {
  const context: RouteContextType = consume(RouterContext, element);
  if (!context) throw console.warn("useNavigate: No router context found");
  return context.params;
};

export const useSearchParams = (element: ICustomElement & HTMLElement) => {
  const context: RouteContextType = consume(RouterContext, element);
  if (!context) throw console.warn("useNavigate: No router context found");
  return context.searchParams;
};

export const useLocation = (element: ICustomElement & HTMLElement) => {
  const context: RouteContextType = consume(RouterContext, element);
  if (!context) throw console.warn("useNavigate: No router context found");
  return context.location;
};

export const useIsRouting = (element: ICustomElement & HTMLElement) => {
  const context: RouteContextType = consume(RouterContext, element);
  if (!context) throw console.warn("useNavigate: No router context found");
  return context.isRouting;
};

export const useMatch = <S extends string>(
  element: ICustomElement & HTMLElement,
  path: () => S
) => {
  const context: RouteContextType = consume(RouterContext, element);
  if (!context) throw console.warn("useNavigate: No router context found");
  return createMemo(() => context.isMatch(path()));
};

export type RouteContextType = ReturnType<typeof initializeRouteContext>;
