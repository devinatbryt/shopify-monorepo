export function debounce<Args extends []>(
  cb: (...args: Args) => void,
  delay = 1000
) {
  let timeout: NodeJS.Timeout | null = null;
  return async function (...args: Args) {
    if (timeout) clearTimeout(timeout);
    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        if (cb) cb(...args);
        resolve(true);
      }, delay);
    });
  };
}

export const groupBy = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T, index: number) => K
) =>
  list.reduce(
    (previous, currentItem, index) => {
      const group = getKey(currentItem, index);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    },
    {} as Record<K, T[]>
  );

export const CSSVars = {
  headerHeight: "--header-height",
  collapsedHeaderHeight: "--collapsed-header-height",
  stickyHeaderHeight: "--sticky-header-height",
  stickyHeaderTop: "--sticky-header-top",
} as const;

export function updateCssVar(
  varName: keyof typeof CSSVars,
  amount: number | string
) {
  document.documentElement.style.setProperty(
    `--${CSSVars[varName]}`,
    `${amount}px`
  );
}
