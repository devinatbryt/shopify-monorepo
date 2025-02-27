import {
  customShadowlessElement,
  correctElementType,
} from "../../utils/solid-element";

import { TabItems, TabTrigger, TabPanel } from "./components";

export { useTabItems } from "./hooks/useTabItems.js";

customShadowlessElement(
  "tab-items",
  {
    activeTab: "",
  },
  correctElementType(TabItems),
);

customShadowlessElement(
  "tab-trigger",
  {
    isActive: false,
    targetId: "",
    preventDefault: true,
  },
  correctElementType(TabTrigger),
);

customShadowlessElement(
  "tab-panel",
  {
    id: "",
    isActive: false,
  },
  correctElementType(TabPanel),
);
