import type { CorrectComponentType } from "../../../utils/solid-element";
import { createRenderEffect, on, onCleanup } from "solid-js";
import { useDrawer } from "../hooks/useDrawer";
import { getSpringConfig, convertPositionToTranslate } from "../utils";
import { animate, spring } from "motion";
import { POSITION } from "../consts";

const DrawerContent: CorrectComponentType<{}> = (_, { element }) => {
  const [state, { updateAnimationQueue }] = useDrawer(element);

  createRenderEffect(
    on(
      () => state.isOpen,
      (isOpen) => {
        if (!isOpen) return;

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
        if (isOpen) return;

        const cleanup = exit(element);
        updateAnimationQueue(cleanup.finished);
        return onCleanup(cleanup.finish);
      }
    )
  );

  function enter(element: HTMLElement) {
    const { position, easing, ...rest } = getSpringConfig(element);
    const [from, to] = convertPositionToTranslate(position || POSITION.LEFT);

    return animate(
      element,
      {
        transform: [from, to],
      },
      { ...rest, easing: spring(easing) }
    );
  }

  function exit(element: HTMLElement) {
    const { position, easing, ...rest } = getSpringConfig(element);
    const [from, to] = convertPositionToTranslate(position || POSITION.LEFT);
    return animate(
      element,
      {
        transform: [to, from],
      },
      { ...rest, easing: spring(easing) }
    );
  }
};

export default DrawerContent;
