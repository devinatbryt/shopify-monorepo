import {
  type ICustomElement,
  createContext,
  provide,
  consume,
} from "component-register";
import { createSelector, mergeProps, splitProps } from "solid-js";
import toHyphenated from "../../../utils/toHyphenated";
import getContextFromProvider from "../../../utils/getContextFromProvider";

type CreateContextOptions = {
  root: HTMLElement & ICustomElement;
  activeTab: string;
};

type WalkableNode = Parameters<typeof provide>[2];

type TabItemsContext = ReturnType<typeof initializeTabItemsContext>;

type ContextKey = keyof Omit<CreateContextOptions, "root">;
type ContextValue<K extends ContextKey> = Omit<CreateContextOptions, "root">[K];

type ContextCallback<K extends ContextKey, T = ContextValue<K>> = (
  state: T,
) => T extends infer R extends ContextValue<K> ? R : never;

function initializeTabItemsContext(props: CreateContextOptions) {
  const [element, stateProps] = splitProps(props, ["root"]);

  function setElementState<K extends ContextKey, T extends ContextValue<K>>(
    key: ContextKey,
    value: T | ContextCallback<K>,
  ) {
    if (typeof value === "function" && value instanceof Function) {
      const currentValue = props[key];
      const result = value(currentValue);
      element.root.setAttribute(toHyphenated(key), `${result}`);
      return;
    }
    return element.root.setAttribute(toHyphenated(key), `${value}`);
  }

  return [stateProps, { setElementState }] as const;
}

const TabItemsContextState = createContext(initializeTabItemsContext);

export const provideTabItemsContext = (
  initialState: Omit<CreateContextOptions, "root">,
  element: WalkableNode,
): TabItemsContext => {
  const props = mergeProps(initialState, { root: element });
  return provide(TabItemsContextState, props, element);
};

export const useTabItemsContext = (context: TabItemsContext) => {
  const [state, { setElementState }] = context;

  function setActive(id: string) {
    setElementState("activeTab", id);
  }

  const isActive = createSelector(() => state.activeTab);

  return [
    state,
    {
      tab: { activate: setActive, isActive },
    },
  ] as const;
};

export const useTabItems = (element: HTMLElement & ICustomElement) => {
  const context: TabItemsContext = consume(TabItemsContextState, element);

  if (!context) {
    throw console.error(
      "Tabs Context not found! Please ensure to wrap your custom element with tabs-section element.",
    );
  }

  return useTabItemsContext(context);
};

export const getTabItemsContext = (element: Element) => {
  const context = getContextFromProvider<TabItemsContext>(
    TabItemsContextState,
    element,
  );
  return useTabItemsContext(context);
};
