import { onCleanup, createEffect, on, createMemo } from "solid-js";

import { customShadowlessElement } from "../../utils/solid-element";

customShadowlessElement(
  "element-portal",
  {
    target: "",
    targetTemplate: "template",
  },
  (props, { element }) => {
    const targetElement = createMemo(() => {
      return document.querySelector(props.target);
    });

    const targetTemplate = createMemo<HTMLTemplateElement>(() => {
      return element.querySelector(props.targetTemplate);
    });

    createEffect(
      on(
        () => ({
          targetElement: targetElement(),
          targetTemplate: targetTemplate(),
        }),
        ({ targetElement, targetTemplate }) => {
          if (!targetElement)
            return console.warn(`Target element ${props.target} not found`);
          if (!targetTemplate)
            return console.warn(
              `Target template ${props.targetTemplate} not found`
            );
          const clonedContent =
            targetTemplate.content.firstElementChild?.cloneNode(true);
          if (!clonedContent)
            return console.warn("No root element found in target template");
          targetElement.appendChild(clonedContent);
          element.portaledElement = clonedContent;
          setTimeout(() => {
            element.dispatchEvent(
              new CustomEvent("element-portal:mounted", {
                bubbles: true,
                detail: { target: clonedContent },
              })
            );
          });
          return onCleanup(() => {
            setTimeout(() => {
              element.dispatchEvent(
                new CustomEvent("element-portal:unmounted", {
                  bubbles: true,
                  detail: { target: clonedContent },
                })
              );
            });
            targetElement.removeChild(clonedContent);
            element.portaledElement = null;
          });
        }
      )
    );
  }
);
