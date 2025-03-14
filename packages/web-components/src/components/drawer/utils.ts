import type { Easing } from "motion";
import { type Position, POSITION } from "./consts.js";

export function hideElement<T extends HTMLElement>(element: T) {
  element.style.display = "none";
}

export function showElement<T extends HTMLElement>(element: T) {
  element.style.display = "block";
}

export function getTransitionConfig<T extends HTMLElement>(element: T) {
  const style = window.getComputedStyle(element);
  return {
    duration: parseFloat(style.getPropertyValue("--duration")) || 0.3,
    delay: parseFloat(style.getPropertyValue("--delay")) || 0,
    endDelay: parseFloat(style.getPropertyValue("--end-delay")) || 0,
    easing: (style.getPropertyValue("--easing") || "ease") as Easing,
    direction: (style.getPropertyValue("--direction") ||
      "normal") as PlaybackDirection,
    repeat: parseInt(style.getPropertyValue("--repeat")) || 0,
    allowWebkitAcceleration:
      style.getPropertyValue("--webkit-acceleration") === "true" || false,
  };
}

export function getSpringConfig<T extends HTMLElement>(element: T) {
  const style = window.getComputedStyle(element);
  return {
    ...getTransitionConfig(element),
    position: style.getPropertyValue("--position") as Position,
    easing: {
      damping: parseFloat(style.getPropertyValue("--damping")) || 10,
      velocity: parseFloat(style.getPropertyValue("--velocity")) || 0,
      stiffness: parseFloat(style.getPropertyValue("--stiffness")) || 100,
      mass: parseFloat(style.getPropertyValue("--mass")) || 2,
      restSpeed: parseFloat(style.getPropertyValue("--rest-speed")) || 2,
      restDistance:
        parseFloat(style.getPropertyValue("--rest-distance")) || 0.5,
    },
  };
}

export function convertPositionToTranslate(position: Position) {
  if (position === POSITION.TOP || position === POSITION.BOTTOM)
    return ["translateY(var(--slide-from))", "translateY(var(--slide-to))"];

  return ["translateX(var(--slide-from))", "translateX(var(--slide-to))"];
}
