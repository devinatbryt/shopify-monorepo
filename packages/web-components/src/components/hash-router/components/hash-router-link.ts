import type { CorrectComponentType } from "../../../utils/solid-element";

import { createEffect, createMemo, onCleanup } from "solid-js";

import { useMatch, useNavigate } from "../hooks/useRouter.js";

type HashRouterLinkProps = {
  href: string;
  inactiveClass?: string;
  activeClass?: string;
};

const HashRouterLink: CorrectComponentType<HashRouterLinkProps> = (
  props,
  { element },
) => {
  const anchorElement = element.querySelector("a");
  if (!anchorElement)
    return console.log("hash-router-link: No anchor element found!");

  const navigate = useNavigate(element);
  const isMatch = useMatch(element, () => props.href);

  const activeClasses = createMemo(() =>
    props.activeClass ? props.activeClass.split(" ") : [],
  );
  const inactiveClasses = createMemo(() =>
    props.inactiveClass ? props.inactiveClass.split(" ") : [],
  );

  createEffect(() => {
    if (props.href) anchorElement.setAttribute("href", `#${props.href}`);
    else anchorElement.removeAttribute("href");
  });

  createEffect(() => {
    const matches = isMatch();
    if (matches) {
      anchorElement.classList.remove(...inactiveClasses());
      anchorElement.classList.add(...activeClasses());
    } else {
      anchorElement.classList.remove(...activeClasses());
      anchorElement.classList.add(...inactiveClasses());
    }
  });

  const handleClick = (event: Event) => {
    event.preventDefault();
    navigate(props.href);
  };

  element.addEventListener("click", handleClick);

  onCleanup(() => {
    element.removeEventListener("click", handleClick);
  });
};

export default HashRouterLink;
