import {
  customShadowlessElement,
  correctElementType,
} from "../../utils/solid-element";
import { HashRouter, HashRouterLink } from "./components";

customShadowlessElement("hash-router", {}, correctElementType(HashRouter));
customShadowlessElement("hash-route", {}, () => {});

customShadowlessElement(
  "hash-router-link",
  {
    href: "",
    activeClass: "",
    inactiveClass: "",
    class: "",
  },
  correctElementType(HashRouterLink)
);
