import stickybits from "stickybits";

import { onCleanup, createEffect, createSignal, on, onMount } from "solid-js";
import { animate } from "motion";

import { debounce, groupBy, updateCssVar } from "./utils";
import { createQueueable } from "../hooks";
import { customShadowlessElement } from "../utils/solid-element";

customShadowlessElement(
  "gnav-header",
  { sticky: true },
  (props, { element }) => {
    const sections = document.querySelectorAll<HTMLElement>(
      "gnav-header-section"
    );
    if (!sections.length) return console.warn("No gnav-header-section found!");
    const [hasScrolledDown, setHasScrolledDown] = createSignal(false);
    const [_, makeQueueable] = createQueueable();

    const queueScrollDownAnimation = makeQueueable(handleScrollDownAnimation);
    const queueScrollUpAnimation = makeQueueable(handleScrollUpAnimation);

    updateCssVar("headerHeight", element.offsetHeight);
    updateCssVar("collapsedHeaderHeight", element.offsetHeight);

    sections.forEach((section, i) => {
      section.setAttribute("position", `${i + 1}`);
      if (!section.style.position) section.style.position = "relative";
      if (section.hasAttribute("hide-on-trigger")) section.style.zIndex = "99";
      else section.style.zIndex = "100";
    });

    onMount(() => {
      let previousScroll = 0;

      function handleScroll() {
        if (window.scrollY === previousScroll) return;
        setHasScrolledDown(window.scrollY > previousScroll);
        previousScroll = Math.max(0, window.scrollY);
      }

      const handleResize = debounce(function () {
        updateCssVar("headerHeight", element.offsetHeight);
        updateCssVar("collapsedHeaderHeight", getCollapsedHeaderHeight());
        if (hasScrolledDown()) handleScrollDownAnimation();
        else handleScrollUpAnimation();
      }, 200);

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize, true);

      return onCleanup(() => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleResize, true);
      });
    });

    createEffect(
      on(
        () => props.sticky,
        (sticky) => {
          if (!sticky) return;
          const s = stickybits(element as any, {
            useStickyClasses: true,
            useGetBoundingClientRect: true,
          });

          return onCleanup(() => {
            s.cleanup();
          });
        }
      )
    );

    createEffect(
      on(hasScrolledDown, (hasScrolledDown) => {
        if (hasScrolledDown) {
          return queueScrollDownAnimation();
        }
        return queueScrollUpAnimation();
      })
    );

    function shouldHideSectionOnTrigger(section: HTMLElement) {
      return section.hasAttribute("hide-on-trigger");
    }

    function getCollapsedHeaderHeight() {
      return Array.from(sections).reduce((total, section) => {
        const isHidden = shouldHideSectionOnTrigger(section);
        if (isHidden) return total;
        const bounding = section.getBoundingClientRect();
        return total + bounding.height;
      }, 0);
    }

    function handleScrollDownAnimation() {
      const animations = [];
      const groupedSections = groupBy(
        Array.from(sections),
        (elem: HTMLElement, i) => {
          const isHidden = shouldHideSectionOnTrigger(elem);
          elem.setAttribute("position", `${i + 1}`);
          if (isHidden) return "hidden";
          return "visible";
        }
      );

      if (!groupedSections?.hidden) groupedSections.hidden = [];

      let offset = groupedSections.hidden.reduce((total, el) => {
        return total + el.getBoundingClientRect().height;
      }, 0);

      groupedSections.hidden.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        const animation = animate(section, {
          y: `${(section.offsetTop + offset) * -1}px`,
        });
        offset -= bounding.height;
        animations.push(animation.finished);
      });

      offset = 0;

      groupedSections.visible.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        const animation = animate(section, {
          y: `${offset - section.offsetTop}px`,
        });
        offset += bounding.height;
        animations.push(animation.finished);
      });

      updateCssVar("stickyHeaderHeight", offset);
      updateCssVar("collapsedHeaderHeight", offset);

      animations.push(animateStickyHeaderTop().finished);

      return Promise.allSettled(animations);
    }

    function handleScrollUpAnimation() {
      updateCssVar("stickyHeaderHeight", element.offsetHeight);
      return Promise.allSettled([
        animate(sections, {
          y: "0px",
        }).finished,
        animateStickyHeaderTop().finished,
      ]);
    }

    function animateStickyHeaderTop() {
      return animate(async () => {
        const calculatedTop = Array.from(sections).reduce((total, section) => {
          const isHidden = shouldHideSectionOnTrigger(section);
          if (isHidden) return total;
          const rect = section.getBoundingClientRect();
          return total + rect.top + rect.height;
        }, 0);

        updateCssVar("stickyHeaderTop", calculatedTop);
      });
    }
  }
);

// Exists as a unique identifier for the "gnav-header" component
customShadowlessElement(
  "gnav-header-section",
  { shouldTrigger: false, position: 0, hideOnTrigger: false },
  () => {}
);
