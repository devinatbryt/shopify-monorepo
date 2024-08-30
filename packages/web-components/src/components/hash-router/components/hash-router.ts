import type { CorrectComponentType } from "../../../utils/solid-element";

import html from "solid-js/html";
import { createMemo, children } from "solid-js";
import { HashRouter as SolidHashRouter, Route } from "@solidjs/router";
import { provideRouteContext, RouterContext } from "../RouteContext";
import { cloneElement, getRouteTemplates } from "../utils";

const generateRoutes = (templates: HTMLTemplateElement[]): any => {
  return Array.from(templates).map((tmpl) => {
    const path = tmpl.getAttribute("data-path"),
      match = tmpl.getAttribute("data-match"),
      clone = cloneElement(tmpl),
      component = clone.querySelector("template[data-component]"),
      routes = generateRoutes(getRouteTemplates(clone.children));

    function Component() {
      if (!component) return null;
      return (props: { children: any }) => {
        const resolved = children(() => props.children);

        const clonedChildren = createMemo(() => {
          const clone = cloneElement(component);
          const children = resolved();
          if (!children) return Array.from(clone.children);
          const slot = clone.querySelector("slot[name='children']");
          if (!slot) return [clone, children];
          slot.replaceWith(children as Node);
          return Array.from(clone.children);
        });

        return html`
          <hash-route
            ref=${(el: any) => {
              provideRouteContext(el);
              el.routerContextId = RouterContext.id;
            }}
          >
            ${clonedChildren}
          <//>
        `;
      };
    }

    return html`<${Route}
      matchFilters=${match || undefined}
      path=${path}
      component=${Component}
      >${routes}<//
    >`;
  });
};

const HashRouter: CorrectComponentType<{}> = (_, { element }) => {
  const clonedElement = cloneElement(element);
  const routes = generateRoutes(getRouteTemplates(clonedElement.children));

  return html`<${SolidHashRouter}>${routes}<//>`;
};

export default HashRouter;
