import type { CorrectComponentType } from "../../../utils/solid-element";
import type { Action } from "../consts";

import { createEffect, on, onCleanup } from "solid-js";

import { observeElementInViewport } from "observe-element-in-viewport";
import { makeEventListener } from "@solid-primitives/event-listener";
import { getDrawerContext } from "../hooks/useDrawer";

type DrawerTriggerProps = {
  target?: string;
  action?: Action | "";
  on?: keyof HTMLElementEventMap | "enter" | "exit";
  preventDefault: boolean;
};

const DrawerTrigger: CorrectComponentType<DrawerTriggerProps> = (
  props,
  { element }
) => {
  if (!props.target)
    return console.warn("DrawerTrigger: target prop is required!");
  if (!props.action)
    return console.warn("DrawerTrigger: action prop is required!");
  if (
    props.action !== "close" &&
    props.action !== "open" &&
    props.action !== "toggle"
  )
    return console.warn(
      "DrawerTrigger: action prop must be 'close', 'open', or 'toggle'"
    );
  if (!props.on) return console.warn("DrawerTrigger: on prop is required!");

  const target = document.querySelector(props.target!);
  if (!target) return console.warn("DrawerTrigger: target element not found!");

  const [state, { open, close, toggle }] = getDrawerContext(target);

  function dispatchAction(action: Action) {
    switch (action) {
      case "close":
        close();
        break;
      case "open":
        open();
        break;
      case "toggle":
        toggle();
        break;
    }
  }

  createEffect(() => {
    element.setAttribute("is-open", `${state.isOpen}`);
    element.setAttribute("is-animating", `${state.isAnimating}`);
  });

  createEffect(
    on(
      () => ({
        action: props.action!,
        on: props.on,
        preventDefault: props.preventDefault,
      }),
      ({ action, on, preventDefault }) => {
        if (!on || !action) return;

        switch (on) {
          case "enter":
            return handleOnEnter(action);
          case "exit":
            return handleOnExit(action);
          default: {
            const clear = makeEventListener(element, on, (event) => {
              if (preventDefault) event.preventDefault();
              dispatchAction(action);
            });

            return onCleanup(clear);
          }
        }
      }
    )
  );

  // Handles the enter/exit events for the drawer.
  function handleOnEnter(action: Action) {
    let unsubscribe = null;
    if (action === "toggle") {
      unsubscribe = observeElementInViewport(element, open, close);
    }

    if (unsubscribe) onCleanup(unsubscribe);
    return;
  }

  function handleOnExit(action: Action) {
    let unsubscribe = null;
    if (action === "toggle") {
      unsubscribe = observeElementInViewport(element, close, open);
    }

    if (unsubscribe) onCleanup(unsubscribe);
    return;
  }
};

export default DrawerTrigger;
