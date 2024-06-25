import type { ICustomElement } from "component-register";
export default function isCustomElement(
  element: any
): element is ICustomElement & HTMLElement {
  return Reflect.has(element, "__initialized");
}
