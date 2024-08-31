import { type RouteProps } from "@solidjs/router";
import { createStore } from "solid-js/store";
import {
  type ICustomElement,
  consume,
  provide,
  createContext,
} from "component-register";

type CreateRoutesContext = {};

function createRoutesContext(_: CreateRoutesContext) {
  const [routes, setRoutes] = createStore<RouteProps<string>[]>([]);
  return [routes, setRoutes] as const;
}

const RoutesContext = createContext(createRoutesContext);

export const provideRoutesContext = (
  element: HTMLElement & ICustomElement
): RoutesContextType => {
  return provide(RoutesContext, {}, element);
};

export const useRoutes = (
  element: HTMLElement & ICustomElement
): RoutesContextType => {
  const context = consume(RoutesContext, element);
  if (!context) throw new Error("useRoutes: No routes context found");
  return context;
};

export type RoutesContextType = ReturnType<typeof createRoutesContext>;
