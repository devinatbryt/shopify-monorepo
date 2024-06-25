import {
  onCleanup,
  createEffect,
  onMount,
  createSignal,
  on,
  batch,
} from "solid-js";
import { createStore } from "solid-js/store";
import { createContext, withConsumer, withProvider } from "component-register";
import { animate } from "motion";

import { customShadowlessElement } from "../utils/customShadowlessElement";

function getContext(element) {
  const elementContextSymbol = Object.getOwnPropertySymbols(element).find(
    (s) => s.description === "element-context"
  );
  const contextSymbol = Object.getOwnPropertySymbols(
    element[elementContextSymbol]
  ).find((s) => s.description === "context");
  return element[elementContextSymbol][contextSymbol];
}

function AccordionBlock(props, { element }) {
  const [accordion, setAccordion] = getContext(element);
  const children = Array.from(element.children);
  const accordionItems = children.filter(
    (child) => child.tagName === "ACCORDION-ITEM"
  );

  accordionItems.forEach((accordionItem, index) => {
    accordionItem.setAttribute("index", index + 1);
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

// Components
function AccordionItem(props, { element, accordion }) {
  const [state, setState] = accordion;

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

function AccordionTrigger(props, { element, accordion }) {
  const [state, setAccordion] = accordion;
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

function AccordionContent(props, { element, accordion }) {
  const [state, setState] = accordion;
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

  const expand = (element) => {
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

  const collapse = (element) => {
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
  AccordionBlock,
  withProvider(AccordionContext, {
    activeIndex: -1,
    isAnimating: false,
    items: [],
  })
);
customShadowlessElement(
  "accordion-item",
  { index: 0, isExpanded: false, ariaExpanded: false, tabindex: 0 },
  AccordionItem,
  withConsumer(AccordionContext, "accordion")
);

customShadowlessElement(
  "accordion-trigger",
  { preventDefault: true },
  AccordionTrigger,
  withConsumer(AccordionContext, "accordion")
);

customShadowlessElement(
  "accordion-content",
  { shouldScrollIntoView: false },
  AccordionContent,
  withConsumer(AccordionContext, "accordion")
);
