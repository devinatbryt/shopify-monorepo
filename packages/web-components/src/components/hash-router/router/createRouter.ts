export function scrollToHash(hash: string, fallbackTop?: boolean) {
  if (!hash && fallbackTop) return window.scrollTo(0, 0);
  else if (!hash) return;
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
