import {
  customShadowlessElement,
  correctElementType,
} from "../../utils/solid-element";
import { HashRoute, HashRouter, HashRouterLink } from "./components";

customShadowlessElement("hash-router", {}, correctElementType(HashRouter));

customShadowlessElement(
  "hash-route",
  { path: "/", activeClass: "", inactiveClass: "", isActive: false },
  correctElementType(HashRoute),
);

customShadowlessElement(
  "hash-router-link",
  {
    href: "",
    activeClass: "",
    inactiveClass: "",
  },
  correctElementType(HashRouterLink),
);

export {
  useNavigate,
  useLocation,
  useMatch,
  useCurrentMatches,
  useParams,
  useSearchParams,
  useIsRouting,
} from "./hooks/useRouter.js";
