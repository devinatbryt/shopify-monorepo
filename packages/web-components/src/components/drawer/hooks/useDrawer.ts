import {
  type ICustomElement,
  createContext,
  provide,
  consume,
} from "component-register";
import { createEffect, mergeProps, on, batch, splitProps } from "solid-js";
import { createStore } from "solid-js/store";
import toHyphenated from "../../../utils/toHyphenated.js";
import getContextFromProvider from "../../../utils/getContextFromProvider.js";

type StoreContext = {
  animationQueue: Promise<unknown>[];
};

type CreateContextOptions = {
  root: HTMLElement & ICustomElement;
  isOpen: boolean;
  isAnimating: boolean;
};

type WalkableNode = Parameters<typeof provide>[2];

type DrawerContext = ReturnType<typeof initializeDrawerContext>;

function initializeDrawerContext(props: CreateContextOptions) {
  const [element, stateProps] = splitProps(props, ["root"]);
  const [store, setStore] = createStore<StoreContext>({ animationQueue: [] });

  createEffect(
    on(
      () => store.animationQueue,
      (animationQueue) => {
        if (!animationQueue.length) return;
        const animations = Promise.all(store.animationQueue);
        setElementState("isAnimating", true);
        animations.then(() => {
          batch(() => {
            setElementState("isAnimating", false);
            setStore("animationQueue", []);
          });
        });
      },
    ),
  );

  function setElementState(
    key: keyof Omit<CreateContextOptions, "root">,
    value: boolean | ((v: boolean) => boolean),
  ) {
    if (typeof value === "function") {
      const currentValue = props[key];
      const result = value(currentValue || false);
      element.root.setAttribute(toHyphenated(key), `${result}`);
      return;
    }
    return element.root.setAttribute(toHyphenated(key), `${value}`);
  }

  return [
    mergeProps(store, stateProps),
    { setElementState, setStore },
  ] as const;
}

const DrawerContextState = createContext(initializeDrawerContext);

export const provideDrawerContext = (
  initialState: Omit<CreateContextOptions, "root">,
  element: WalkableNode,
): DrawerContext => {
  const props = mergeProps(initialState, { root: element });
  return provide(DrawerContextState, props, element);
};

export const useDrawerContext = (context: DrawerContext) => {
  const [state, { setElementState, setStore: setState }] = context;

  function updateAnimationQueue(animation: Promise<unknown>) {
    setState("animationQueue", (state) => [...state, animation]);
  }

  function close() {
    setElementState("isOpen", false);
  }

  function open() {
    setElementState("isOpen", true);
  }

  function toggle() {
    setElementState("isOpen", (open) => !open);
  }

  return [state, { updateAnimationQueue, close, open, toggle }] as const;
};

export const useDrawer = (element: HTMLElement & ICustomElement) => {
  const context: DrawerContext = consume(DrawerContextState, element);

  if (!context) {
    throw console.error(
      "DrawerContext not found! Please ensure to wrap your custom element with drawer-context element.",
    );
  }

  return useDrawerContext(context);
};

export const getDrawerContext = (element: Element) => {
  const context = getContextFromProvider<DrawerContext>(
    DrawerContextState,
    element,
  );
  return useDrawerContext(context);
};
