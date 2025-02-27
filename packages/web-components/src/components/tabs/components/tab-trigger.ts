import type { CorrectComponentType } from "../../../utils/solid-element";

import { createEffect, createMemo, on, onCleanup } from "solid-js";

import { useTabItems } from "../hooks/useTabItems.js";

type TabTriggerProps = {
  preventDefault: boolean;
  isActive: boolean;
  targetId: string;
};

const TabTrigger: CorrectComponentType<TabTriggerProps> = (
  props,
  { element },
) => {
  if (!props.targetId)
    return console.warn("tab-trigger: target-id prop is required!");
  const [_, methods] = useTabItems(element);

  const isActive = createMemo(() => methods.tab.isActive(props.targetId));

  createEffect(
    on(isActive, (isActive) => {
      if (isActive === props.isActive) return;
      element.setAttribute("is-active", `${isActive}`);
    }),
  );

  createEffect(() => {
    if (!props.targetId)
      return console.warn("tab-trigger: target-id prop is required!");

    const handleClick = (event: MouseEvent) => {
      if (props.preventDefault) event.preventDefault();
      methods.tab.activate(props.targetId);
    };

    element.addEventListener("click", handleClick);

    return onCleanup(() => {
      element.removeEventListener("click", handleClick);
    });
  });
};

export default TabTrigger;
