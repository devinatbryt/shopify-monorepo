import type { ICustomElement } from "component-register";

import { type JSX, onCleanup } from "solid-js";
import {
  createRouter,
  saveCurrentDepth,
  createBeforeLeave,
  keepDepth,
  notifyIfNotBlocked,
  type BaseRouterProps,
} from "@solidjs/router";
import { delegateEvents } from "solid-js/web";

import { scrollToHash, bindEvent } from "./createRouter.js";
import { provideRouterContext } from "../hooks/useRouter.js";

export function hashParser(str: string) {
  const to = str.replace(/^.*?#/, "");
  // Hash-only hrefs like `#foo` from plain anchors will come in as `/#foo` whereas a link to
  // `/foo` will be `/#/foo`. Check if the to starts with a `/` and if not append it as a hash
  // to the current path so we can handle these in-page anchors correctly.
  if (!to.startsWith("/")) {
    const [, path = "/"] = window.location.hash.split("#", 2);
    return `${path}#${to}`;
  }
  return to;
}

export type HashRouterProps = BaseRouterProps & {
  explicitLinks?: boolean;
  preload?: boolean;
  ref: HTMLElement & ICustomElement;
};

export function HashRouter(props: HashRouterProps): JSX.Element {
  const getSource = () => window.location.hash.slice(1);
  const beforeLeave = createBeforeLeave();
  return createRouter({
    get: getSource,
    set({ value, replace, scroll, state }) {
      if (replace) {
        window.history.replaceState(keepDepth(state), "", "#" + value);
      } else {
        window.history.pushState(state, "", "#" + value);
      }
      const hashIndex = value.indexOf("#");
      const hash = hashIndex >= 0 ? value.slice(hashIndex + 1) : "";
      scrollToHash(hash, scroll);
      saveCurrentDepth();
    },
    init: (notify) =>
      bindEvent(
        window,
        "hashchange",
        notifyIfNotBlocked(
          notify,
          (delta) =>
            !beforeLeave.confirm(delta && delta < 0 ? delta : getSource())
        )
      ),
    create: (router) => {
      if (props.ref) provideRouterContext(router, props.ref);
      const basePath = router.base.path();
      const navigateFromRoute = router.navigatorFactory(router.base);
      let preloadTimeout: Record<string, number> = {};

      function isSvg<T extends SVGElement>(el: T | HTMLElement): el is T {
        return el.namespaceURI === "http://www.w3.org/2000/svg";
      }

      function handleAnchor(evt: MouseEvent) {
        if (
          evt.defaultPrevented ||
          evt.button !== 0 ||
          evt.metaKey ||
          evt.altKey ||
          evt.ctrlKey ||
          evt.shiftKey
        )
          return;

        const a = evt
          .composedPath()
          .find(
            (el) => el instanceof Node && el.nodeName.toUpperCase() === "A"
          ) as HTMLAnchorElement | SVGAElement | undefined;

        if (!a || (props.explicitLinks && !a.hasAttribute("link"))) return;

        const svg = isSvg(a);
        const href = svg ? a.href.baseVal : a.href;
        const target = svg ? a.target.baseVal : a.target;
        if (target || (!href && !a.hasAttribute("state"))) return;

        const rel = (a.getAttribute("rel") || "").split(/\s+/);
        if (a.hasAttribute("download") || (rel && rel.includes("external")))
          return;

        const url = svg ? new URL(href, document.baseURI) : new URL(href);
        if (
          url.origin !== window.location.origin ||
          (basePath &&
            url.pathname &&
            !url.pathname.toLowerCase().startsWith(basePath.toLowerCase()))
        )
          return;
        return [a, url] as const;
      }

      function handleAnchorClick(evt: Event) {
        const res = handleAnchor(evt as MouseEvent);
        if (!res) return;
        const [a, url] = res;
        const to = router.parsePath(url.pathname + url.search + url.hash);
        const state = a.getAttribute("state");

        evt.preventDefault();
        navigateFromRoute(to, {
          resolve: false,
          replace: a.hasAttribute("replace"),
          scroll: !a.hasAttribute("noscroll"),
          state: state && JSON.parse(state),
        });
      }

      function handleAnchorPreload(evt: Event) {
        const res = handleAnchor(evt as MouseEvent);
        if (!res) return;
        const [a, url] = res;
        if (!preloadTimeout[url.pathname])
          router.preloadRoute(url, {
            preloadData: a.getAttribute("preload") !== "false",
          });
      }

      function handleAnchorIn(evt: Event) {
        const res = handleAnchor(evt as MouseEvent);
        if (!res) return;
        const [a, url] = res;
        if (preloadTimeout[url.pathname]) return;
        preloadTimeout[url.pathname] = setTimeout(() => {
          router.preloadRoute(url, {
            preloadData: a.getAttribute("preload") !== "false",
          });
          delete preloadTimeout[url.pathname];
        }, 200) as any;
      }

      function handleAnchorOut(evt: Event) {
        const res = handleAnchor(evt as MouseEvent);
        if (!res) return;
        const [, url] = res;
        if (preloadTimeout[url.pathname]) {
          clearTimeout(preloadTimeout[url.pathname]);
          delete preloadTimeout[url.pathname];
        }
      }

      // ensure delegated event run first
      delegateEvents(["click", "submit"]);
      document.addEventListener("click", handleAnchorClick);
      if (props.preload) {
        document.addEventListener("mouseover", handleAnchorIn);
        document.addEventListener("mouseout", handleAnchorOut);
        document.addEventListener("focusin", handleAnchorPreload);
        document.addEventListener("touchstart", handleAnchorPreload);
      }
      onCleanup(() => {
        document.removeEventListener("click", handleAnchorClick);
        if (props.preload) {
          document.removeEventListener("mouseover", handleAnchorIn);
          document.removeEventListener("mouseout", handleAnchorOut);
          document.removeEventListener("focusin", handleAnchorPreload);
          document.removeEventListener("touchstart", handleAnchorPreload);
        }
      });
    },
    utils: {
      go: (delta) => window.history.go(delta),
      renderPath: (path) => `#${path}`,
      parsePath: hashParser,
      beforeLeave,
    },
  })(props);
}
