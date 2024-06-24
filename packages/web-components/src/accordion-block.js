import {
  onCleanup,
  createEffect,
  onMount,
  createSignal,
  on,
  batch,
} from "solid-js";
import { createStore } from "solid-js/store";
import { createContext, provide, consume } from "component-register";
import { animate } from "motion";

import { customShadowlessElement } from "./utils/solid-element";

// Context
const AccordionContext = createContext(
  (
    state = {
      activeIndex: 1,
      isAnimating: false,
      items: [],
    }
  ) => {
    return createStore(state);
  }
);

function consumeAccordionContext(element) {
  return consume(AccordionContext, element);
}

// Custom Element Definitions
customShadowlessElement(
  "accordion-block",
  { activeIndex: -1 },
  (props, { element }) => {
    const [accordion, setAccordion] = provide(
      AccordionContext,
      undefined,

      element
    );
    const children = Array.from(element.children);
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
    const [state, setState] = consumeAccordionContext(element);

    createEffect(
      on(
        () => ({ isExpanded: props.isExpanded }),
        ({ isExpanded }) => {
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
          element.setAttribute("is-expanded", props.index === activeIndex);
          element.setAttribute("aria-expanded", props.index === activeIndex);
        }
      )
    );
  }
);

customShadowlessElement(
  "accordion-trigger",
  { preventDefault: true },
  (props, { element }) => {
    const [state, setAccordion] = consumeAccordionContext(element);

    const accordionItem = element.closest("accordion-item");

    onMount(() => {
      const handleClick = (e) => {
        if (props.preventDefault) e.preventDefault();
        const index = parseInt(accordionItem.getAttribute("index"));
        if (state.isAnimating) return;
        if (index === state.activeIndex) return setAccordion("activeIndex", -1);
        return setAccordion("activeIndex", index);
      };

      element.addEventListener("click", handleClick);

      onCleanup(() => {
        element.removeEventListener("click", handleClick);
      });
    });
  }
);

customShadowlessElement(
  "accordion-content",
  { shouldScrollIntoView: false },
  (props, { element }) => {
    const [state, setState] = consumeAccordionContext(element);
    const [isFirstRender, setIsFirstRender] = createSignal(true);

    onMount(() => {
      setIsFirstRender(false);
    });

    const hideElement = (element) => {
      element.style.cssText = `
          display: none;
          opacity: 0;
          visibility: hidden;
          max-height: 0px;
        `;
      element.style.overflow = null;
    };

    const showElement = (element) => {
      element.style.cssText = `
          display: block;
          opacity: 1;
          visibility: visible;
        `;
    };

    const getHeight = (el) => {
      el.style.maxHeight = "max-content";
      const height = el.getBoundingClientRect().height;
      el.style.maxHeight = 0;
      return height;
    };

    const getPaddingTop = (element) => {
      const paddingY = parseInt(getComputedStyle(element).paddingTop);
      return paddingY;
    };

    const getPaddingBottom = (element) => {
      const paddingY = parseInt(getComputedStyle(element).paddingBottom);
      return paddingY;
    };

    const transition = { duration: 0.35 };

    const expand = async (element) => {
      showElement(element);

      const height = getHeight(element),
        pt = getPaddingTop(element),
        pb = getPaddingBottom(element);

      Array.from(element.children).forEach(
        (child) => (child.style.opacity = "1")
      );

      return animate(
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

    const collapse = async (element) => {
      const height = getHeight(element),
        pt = getPaddingTop(element),
        pb = getPaddingBottom(element);

      element.style.overflow = "hidden";

      Array.from(element.children).forEach(
        (child) => (child.style.opacity = "0")
      );

      return animate(
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
          const index = parseInt(accordionItem.getAttribute("index"));
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