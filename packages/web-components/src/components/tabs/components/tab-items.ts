import type { CorrectComponentType } from "../../../utils/solid-element";

import { provideTabItemsContext } from "../hooks/useTabItems.js";

type TabItemsProps = {
  activeTab: string;
};

const TabItems: CorrectComponentType<TabItemsProps> = (props, { element }) => {
  provideTabItemsContext(props, element);
};

export default TabItems;
