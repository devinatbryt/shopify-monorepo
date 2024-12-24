import type { CorrectComponentType } from "../../../utils/solid-element";
import type { ICustomElement } from "component-register";

import { createEffect, createMemo, on, onCleanup, onMount } from "solid-js";

import { useTabItems } from "../hooks/useTabItems";
import { animate } from "motion";

type TabPanelProps = {
  id: string;
  isActive: boolean;
};

const hideElement = (
  element: ICustomElement & HTMLElement,
  isFirstRender = false,
) => {
  element.style.position = "absolute";
  element.style.top = "0px";
  element.style.left = "0px";
  if (isFirstRender) element.style.opacity = "0";
  element.style.visibility = "hidden";
  return element;
};

const showElement = (
  element: ICustomElement & HTMLElement,
  isFirstRender: boolean = false,
) => {
  element.style.position = "relative";
  element.style.display = "block";
  if (isFirstRender) element.style.opacity = "1";
  element.style.visibility = "visible";
  //@ts-ignore
  element.style.top = null;
  //@ts-ignore
  element.style.left = null;
  return element;
};

const showTabContent = (element: ICustomElement & HTMLElement) => {
  showElement(element);

  const animation = animate(element, {
    opacity: ["0", "1"],
  });

  return animation;
};

const hideTabContent = (element: ICustomElement & HTMLElement) => {
  hideElement(element);
};

const TabPanel: CorrectComponentType<TabPanelProps> = (props, { element }) => {
  const [_, methods] = useTabItems(element);

  const isActive = createMemo(() => methods.tab.isActive(props.id));

  let isFirstRender = true;

  createEffect(
    on(isActive, (isActive) => {
      if (isActive === props.isActive) return;
      element.setAttribute("is-active", `${isActive}`);
    }),
  );

  // Animation for when the tab items become active or deactive.
  createEffect(
    on(isActive, (isActive) => {
      if (!isActive) {
        if (isFirstRender) hideElement(element);
        hideTabContent(element);
        return onCleanup(() => {});
      }

      if (isFirstRender) return showElement(element, true);

      const animation = showTabContent(element);

      return onCleanup(() => {
        animation.finish();
      });
    }),
  );

  onMount(() => {
    isFirstRender = false;
  });
};

export default TabPanel;
