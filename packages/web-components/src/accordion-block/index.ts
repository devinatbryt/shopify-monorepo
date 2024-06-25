import {
  onCleanup,
  createEffect,
  onMount,
  createSignal,
  on,
  batch,
} from "solid-js";
import { createStore } from "solid-js/store";
import {
  createContext,
  provide,
  consume,
  type ICustomElement,
} from "component-register";
import { animate } from "motion";

import customShadowlessElement from "../utils/customShadowlessElement";
import isCustomElement from "../utils/isCustomElement";
// Context
const AccordionContext = createContext(
  (state = { activeIndex: -1, isAnimating: false, items: [] }) => {
    return createStore(state);
  }
);

// Custom Element Definitions
customShadowlessElement(
  "accordion-block",
  { activeIndex: -1 },
  (props, { element }) => {
    const [accordion, setAccordion] = provide(AccordionContext, {
      activeIndex: -1,
      isAnimating: false,
      items: [],
    });
    const children = Array.from(element.children) as HTMLElement[];
    const accordionItems = children.filter(
      (child) => child.tagName === "ACCORDION-ITEM"
    );

    accordionItems.forEach((accordionItem, index) => {
      accordionItem.setAttribute("index", `${index + 1}`);
      if (accordionItem.getAttribute("is-expanded") !== "true") return;
      batch(() => {
        element.setAttribute("active-index", index + 1);
        setAccordion("activeIndex", index + 1);
        setAccordion("items", index, {
          isExpanded: true,
        });
      });
    });

    createEffect(
      on(
        () => accordion.activeIndex,
        (activeIndex) => {
          element.setAttribute("active-index", activeIndex);
        }
      )
    );

    createEffect(
      on(
        () => props.activeIndex,
        (activeIndex) => {
          setAccordion("activeIndex", activeIndex);
        }
      )
    );
  }
);

customShadowlessElement(
  "accordion-item",
  { index: 0, isExpanded: false, ariaExpanded: false, tabindex: 0 },
  (props, { element }) => {
    if (!isCustomElement(element)) return;
    const [state, setState] = consume(AccordionContext, element);

    createEffect(
      on(
        () => props.isExpanded,
        (isExpanded) => {
          console.log("AccordionItem(props)", isExpanded, props.index, state);
          setState("items", props.index - 1, {
            isExpanded: isExpanded || false,
          });
        }
      )
    );

    createEffect(
      on(
        () => ({ activeIndex: state.activeIndex }),
        ({ activeIndex }) => {
          element.setAttribute("is-expanded", `${props.index === activeIndex}`);
          element.setAttribute(
            "aria-expanded",
            `${props.index === activeIndex}`
          );
        }
      )
    );
  }
);

customShadowlessElement(
  "accordion-trigger",
  { preventDefault: true },
  (props, { element }) => {
    if (!isCustomElement(element)) return;
    const [state, setAccordion] = consume(AccordionContext, element);
    const accordionItem = element.closest("accordion-item");

    const handleClick = (e: Event) => {
      if (!accordionItem)
        return console.warn("No accordion-item found as a relative parent!");
      if (props.preventDefault) e.preventDefault();
      const index = parseInt(accordionItem?.getAttribute("index") || "-1");
      if (state.isAnimating) return;
      if (index === state.activeIndex) return setAccordion("activeIndex", -1);
      return setAccordion("activeIndex", index);
    };

    element.addEventListener("click", handleClick);

    onCleanup(() => {
      element.removeEventListener("click", handleClick);
    });
  }
);

customShadowlessElement(
  "accordion-content",
  { shouldScrollIntoView: false },
  (props, { element }) => {
    if (!isCustomElement(element)) return;
    const [state, setState] = consume(AccordionContext, element);
    const [isFirstRender, setIsFirstRender] = createSignal(true);

    onMount(() => {
      setIsFirstRender(false);
    });

    const hideElement = (element: ICustomElement) => {
      element.style.cssText = `
      display: none;
      opacity: 0;
      visibility: hidden;
      max-height: 0px;
    `;
      element.style.overflow = null;
    };

    const showElement = (element: ICustomElement) => {
      element.style.cssText = `
      display: block;
      opacity: 1;
      visibility: visible;
    `;
    };

    const getHeight = (el: ICustomElement) => {
      el.style.maxHeight = "max-content";
      const height = el.getBoundingClientRect().height;
      el.style.maxHeight = 0;
      return height;
    };

    const getPaddingTop = (element: ICustomElement) => {
      // @ts-expect-error
      const paddingY = parseInt(getComputedStyle(element).paddingTop);
      return paddingY;
    };

    const getPaddingBottom = (element: ICustomElement) => {
      // @ts-expect-error
      const paddingY = parseInt(getComputedStyle(element).paddingBottom);
      return paddingY;
    };

    const transition = { duration: 0.35 };

    const expand = (element: ICustomElement) => {
      showElement(element);

      const height = getHeight(element),
        pt = getPaddingTop(element),
        pb = getPaddingBottom(element);

      (Array.from(element.children) as HTMLElement[]).forEach(
        (child) => (child.style.opacity = "1")
      );

      return animate(
        // @ts-expect-error
        element,
        {
          maxHeight: ["0px", `${height}px`],
          paddingTop: ["0px", `${pt}px`],
          paddingBottom: ["0px", `${pb}px`],
        },
        transition
      ).finished.then(() => {
        element.style.maxHeight = "max-content";
        element.style.overflow = null;
        if (props.shouldScrollIntoView)
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        return;
      });
    };

    const collapse = (element: ICustomElement) => {
      const height = getHeight(element),
        pt = getPaddingTop(element),
        pb = getPaddingBottom(element);

      element.style.overflow = "hidden";

      (Array.from(element.children) as HTMLElement[]).forEach(
        (child) => (child.style.opacity = "0")
      );

      return animate(
        // @ts-expect-error
        element,
        {
          maxHeight: [`${height}px`, "0px"],
          paddingTop: [`${pt}px`, "0px"],
          paddingBottom: [`${pb}px`, "0px"],
        },
        transition
      ).finished.then(() => hideElement(element));
    };

    createEffect(
      on(
        () => {
          const accordionItem = element.closest("accordion-item");
          const index = parseInt(accordionItem?.getAttribute("index") || "0");
          const item = state.items[index - 1];
          return { isExpanded: item?.isExpanded };
        },
        (item) => {
          if (!item) return;
          setState("isAnimating", true);
          if (!item.isExpanded)
            return collapse(element).then(() => setState("isAnimating", false));

          if (isFirstRender()) {
            return showElement(element);
          }
          return expand(element).then(() => setState("isAnimating", false));
        }
      )
    );
  }
);
