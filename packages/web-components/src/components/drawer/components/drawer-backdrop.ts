import { createSignal, createRenderEffect, on, onCleanup } from "solid-js";
import type { CorrectComponentType } from "../../../utils/solid-element";
import { useDrawer } from "../hooks/useDrawer";
import { getTransitionConfig } from "../utils";
import { animate } from "motion";
import { createEventListener } from "@solid-primitives/event-listener";

type DrawerBackdropProps = {};

const DrawerBackdrop: CorrectComponentType<DrawerBackdropProps> = (
  _,
  { element }
) => {
  const [state, { updateAnimationQueue, close }] = useDrawer(element);
  const [firstRender, setFirstRender] = createSignal(true);

  createRenderEffect(
    on(
      () => state.isOpen,
      (isOpen) => {
        if (!isOpen || firstRender()) return;
        const cleanup = enter(element);
        updateAnimationQueue(cleanup.finished);
        return onCleanup(cleanup.finish);
      }
    )
  );

  createRenderEffect(
    on(
      () => state.isOpen,
      (isOpen) => {
        if (isOpen || firstRender()) return;
        const cleanup = exit(element);
        updateAnimationQueue(cleanup.finished);
        return onCleanup(cleanup.finish);
      }
    )
  );

  function enter(element: HTMLElement) {
    const transition = getTransitionConfig(element);
    return animate(
      element,
      {
        opacity: [`var(--opacity-from)`, `var(--opacity-to)`],
      },
      transition
    );
  }

  function exit(element: HTMLElement) {
    const transition = getTransitionConfig(element);
    return animate(
      element,
      {
        opacity: [`var(--opacity-to)`, `var(--opacity-from)`],
      },
      transition
    );
  }

  createEventListener(element, "click", close);

  setFirstRender(false);
};

export default DrawerBackdrop;
