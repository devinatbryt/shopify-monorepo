import type { CorrectComponentType } from "../../../utils/solid-element";

import { createRenderEffect, on, onCleanup } from "solid-js";
import { animate } from "motion";

import { useDrawer } from "../hooks/useDrawer.js";
import { getTransitionConfig } from "../utils.js";

type DrawerBackdropProps = {};

const DrawerBackdrop: CorrectComponentType<DrawerBackdropProps> = (
  _,
  { element },
) => {
  const [state, { updateAnimationQueue, close }] = useDrawer(element);

  createRenderEffect(
    on(
      () => state.isOpen,
      (isOpen) => {
        if (!isOpen) return;
        const cleanup = enter(element);
        updateAnimationQueue(cleanup.finished);
        return onCleanup(cleanup.finish);
      },
    ),
  );

  createRenderEffect(
    on(
      () => state.isOpen,
      (isOpen) => {
        if (isOpen) return;
        const cleanup = exit(element);
        updateAnimationQueue(cleanup.finished);
        return onCleanup(cleanup.finish);
      },
    ),
  );

  function enter(element: HTMLElement) {
    const transition = getTransitionConfig(element);
    return animate(
      element,
      {
        opacity: [`var(--opacity-from)`, `var(--opacity-to)`],
      },
      transition,
    );
  }

  function exit(element: HTMLElement) {
    const transition = getTransitionConfig(element);
    return animate(
      element,
      {
        opacity: [`var(--opacity-to)`, `var(--opacity-from)`],
      },
      transition,
    );
  }

  element.addEventListener("click", close);

  onCleanup(() => {
    element.removeEventListener("click", close);
  });
};

export default DrawerBackdrop;
