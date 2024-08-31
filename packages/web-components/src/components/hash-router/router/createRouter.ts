export function scrollToHash(hash: string, fallbackTop?: boolean) {
  const el = document.querySelector(`#${hash}`);
  if (el) {
    el.scrollIntoView();
  } else if (fallbackTop) {
    window.scrollTo(0, 0);
  }
}

export function bindEvent(
  target: EventTarget,
  type: string,
  handler: EventListener
) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}
