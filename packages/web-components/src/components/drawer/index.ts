import {
  customShadowlessElement,
  correctElementType,
} from "../../utils/solid-element";

import {
  DrawerBackdrop,
  DrawerContent,
  DrawerContext,
  DrawerTrigger,
} from "./components";

customShadowlessElement(
  "drawer-context",
  {
    isOpen: false,
    id: "",
    closeOnEscape: false,
    shouldTrapFocus: false,
    isAnimating: false,
  },
  correctElementType(DrawerContext)
);

customShadowlessElement(
  "drawer-trigger",
  { target: "", action: "", on: "click", preventDefault: true },
  correctElementType(DrawerTrigger)
);

customShadowlessElement(
  "drawer-backdrop",
  {},
  correctElementType(DrawerBackdrop)
);

customShadowlessElement(
  "drawer-content",
  {},
  correctElementType(DrawerContent)
);
