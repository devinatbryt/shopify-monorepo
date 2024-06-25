import {
  register,
  compose,
  type ComponentType as mComponentType,
  type FunctionComponent,
  type ComponentOptions,
  noShadowDOM,
} from "component-register";

export type ComponentType<T> = mComponentType<T>;
import { withSolid } from "solid-element";

function withNoShadowDOM<T extends object>(
  Component: ComponentType<T> = () => {}
) {
  return (props: T, options: ComponentOptions) => {
    noShadowDOM();
    const comp = (Component as FunctionComponent<T>)(props, options);
    return comp;
  };
}

export default function customShadowlessElement<T extends object>(
  tagName: string,
  props: T,
  Component: ComponentType<T> = () => {},
  ...rest: ((C: ComponentType<T>) => ComponentType<T>)[]
) {
  return compose(
    register(tagName, props),
    withNoShadowDOM,
    withSolid,
    ...rest
  )(Component);
}
