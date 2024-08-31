import type { CorrectComponentType } from "../../../utils/solid-element";

import html from "solid-js/html";
import { HashRouter as CustomRouter } from "../router";
import { getHashRouterContextId } from "../hooks/useRouter";
import { provideRoutesContext } from "../hooks/useRoutes";

const HashRouter: CorrectComponentType<{}> = (_, { element }) => {
  Object.assign(element, { routerContextId: getHashRouterContextId() });
  const [routes] = provideRoutesContext(element);

  html`<${CustomRouter} ref=${element}>${routes}<//>`;
};

export default HashRouter;
