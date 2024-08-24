import { createContext } from "component-register";

export default function getContextFromProvider<T>(
  context: ReturnType<typeof createContext>,
  element: Element
) {
  const ctxSymbol = Object.getOwnPropertySymbols(element).find(
    (s) => s.description === "element-context"
  );
  if (!ctxSymbol) {
    throw new Error("No context provider found for the provided element");
  }
  // @ts-ignore
  const contexts = element[ctxSymbol];
  return contexts[context.id] as T;
}
