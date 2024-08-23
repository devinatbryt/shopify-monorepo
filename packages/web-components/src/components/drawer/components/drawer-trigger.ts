import type { CorrectComponentType } from "../../../utils/solid-element";
import type { Action } from "../consts";

import { createEffect, on, onCleanup } from "solid-js";

import { observeElementInViewport } from "observe-element-in-viewport";
import { eventNameFromId } from "../utils";
import { makeEventListener } from "@solid-primitives/event-listener";

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

  const dispatchAction = (action: Action) => {
    const customEvent = new CustomEvent(
      eventNameFromId({ id: props.target!.replace("#", "") }),
      {
        detail: {
          action,
          currentTarget: element.target,
          relatedTarget: document.getElementById(props.target!),
        },
      }
    );
    dispatchEvent(customEvent);
  };

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
              return dispatchAction(action);
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
      unsubscribe = observeElementInViewport(
        element,
        () => dispatchAction("open"),
        () => dispatchAction("close")
      );
    } else {
      unsubscribe = observeElementInViewport(element, dispatch, dispatch);
    }

    function dispatch() {
      return dispatchAction(action);
    }

    return onCleanup(unsubscribe);
  }

  function handleOnExit(action: Action) {
    let unsubscribe = null;
    if (action === "toggle") {
      unsubscribe = observeElementInViewport(
        element,
        () => dispatchAction("close"),
        () => dispatchAction("open")
      );
    } else {
      unsubscribe = observeElementInViewport(element, dispatch, dispatch);
    }

    function dispatch() {
      return dispatchAction(action);
    }

    return onCleanup(unsubscribe);
  }
};

export default DrawerTrigger;
