import type { CorrectComponentType } from "../../../utils/solid-element";
import { createEffect, createMemo, mergeProps } from "solid-js";
import { useCurrentMatches } from "../hooks/useRouter";
import {
  type ICustomElement,
  createContext,
  consume,
  provide,
} from "component-register";
import { useRoutes } from "../hooks/useRoutes";
import { RouteProps } from "@solidjs/router";
import { isEqual } from "lodash-es";

type HashRouteProps = {
  path: string;
  activeClass?: string;
  inactiveClass?: string;
  isActive?: boolean;
};

type HashContextProps = HashRouteProps & {
  element: HTMLElement & ICustomElement;
};

type HashRouteContextType = {
  positions: Array<number>;
  children: RouteProps<string>[];
  isChildRoute: boolean;
} | null;

const HashRouteContext = createContext(createHashRouteContext);

const getRoutePath = (positions: number[]): Array<number | "children"> =>
  JSON.parse(`[${positions.join(`,"children",`)}]`);

const getRoutePositions = (
  parentCtx: HashRouteContextType,
  length: number
): number[] => {
  if (!parentCtx) return [length];
  return [...parentCtx.positions, parentCtx.children.length];
};

function createHashRouteContext(props: HashContextProps) {
  const parentCtx = useRouteContext(props.element);
  const [routes, setRoutes] = useRoutes(props.element);

  const positions = getRoutePositions(parentCtx, routes.length);
  const routeUpdatePath = getRoutePath(positions);

  const route = {
    positions,
    path: props.path,
    children: [],
  };

  // @ts-ignore
  setRoutes(...routeUpdatePath, route);

  return {
    path: props.path,
    positions,
    children: (
      routeUpdatePath.reduce((route: any, key) => {
        return route[key];
      }, routes) as RouteProps<string>
    )["children"],
  };
}

function useRouteContext(element: HTMLElement & ICustomElement) {
  const context = consume(HashRouteContext, element);
  if (!context) return null;
  return context as HashRouteContextType;
}

function provideHashRouteContext(
  element: HTMLElement & ICustomElement,
  props: HashRouteProps
): HashRouteContextType {
  return provide(HashRouteContext, mergeProps(props, { element }), element);
}

const HashRoute: CorrectComponentType<HashRouteProps> = (
  props,
  { element }
) => {
  const route = provideHashRouteContext(element, props);
  const currentMatches = useCurrentMatches(element);
  const isMatch = createMemo(() => {
    return currentMatches().some((match) => isEqual(match.route.key, route));
  });

  createEffect(() => {
    if (isMatch()) element.setAttribute("is-active", "true");
    else element.removeAttribute("is-active");
  });

  createEffect(() => {
    if (isMatch()) {
      if (!props.activeClass && !props.inactiveClass)
        // @ts-ignore
        element.style.display = null;
      if (props.activeClass) element.classList.add(props.activeClass);
      if (props.inactiveClass) element.classList.remove(props.inactiveClass);
    } else {
      if (!props.activeClass && !props.inactiveClass)
        element.style.display = "none";
      if (props.inactiveClass) element.classList.add(props.inactiveClass);
      if (props.activeClass) element.classList.remove(props.activeClass);
    }
  });
};

export default HashRoute;
