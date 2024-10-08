import {
  register,
  ComponentType as mComponentType,
  ICustomElement,
  FunctionComponent,
  ComponentOptions,
  PropsDefinitionInput,
  noShadowDOM,
  compose,
} from "component-register";
import { createRoot, createSignal } from "solid-js";
import { insert } from "solid-js/web";

export type ComponentType<T> = mComponentType<T>;

type CorrectComponentOptions = { element: HTMLElement & ICustomElement };

export type CorrectComponentType<T> = (
  props: T,
  options: CorrectComponentOptions
) => unknown;

function createProps<T extends object>(raw: T) {
  const keys = Object.keys(raw) as (keyof T)[];
  const props = {};
  for (let i = 0; i < keys.length; i++) {
    const [get, set] = createSignal(raw[keys[i]]);
    Object.defineProperty(props, keys[i], {
      get,
      set(v) {
        set(() => v);
      },
    });
  }
  return props as T;
}

function lookupContext(el: ICustomElement & { _$owner?: any }) {
  if (el.assignedSlot && el.assignedSlot._$owner)
    return el.assignedSlot._$owner;
  let next: Element & { _$owner?: any } = el.parentNode;
  while (
    next &&
    !next._$owner &&
    !(
      next.assignedSlot &&
      (next.assignedSlot as Element & { _$owner?: any })._$owner
    )
  )
    next = next.parentNode as Element;
  return next && next.assignedSlot
    ? (next.assignedSlot as Element & { _$owner?: any })._$owner
    : el._$owner;
}

function withSolid<T extends object>(
  ComponentType: ComponentType<T>
): ComponentType<T> {
  return (rawProps: T, options: ComponentOptions) => {
    const { element } = options as {
      element: ICustomElement & { _$owner?: any };
    };
    return createRoot((dispose: Function) => {
      const props = createProps<T>(rawProps);

      element.addPropertyChangedCallback(
        (key: string, val: any) => (props[key as keyof T] = val)
      );
      element.addReleaseCallback(() => {
        element.renderRoot.textContent = "";
        dispose();
      });

      const comp = (ComponentType as FunctionComponent<T>)(props as T, options);
      return insert(element.renderRoot, comp);
    }, lookupContext(element));
  };
}

function customElement<T extends object>(
  tag: string,
  ComponentType: ComponentType<T>
): (ComponentType: ComponentType<T>) => any;
function customElement<T extends object>(
  tag: string,
  props: PropsDefinitionInput<T>,
  ComponentType: ComponentType<T>
): (ComponentType: ComponentType<T>) => any;
function customElement<T extends object>(
  tag: string,
  props: PropsDefinitionInput<T> | ComponentType<T>,
  ComponentType?: ComponentType<T>
): (ComponentType: ComponentType<T>) => any {
  if (arguments.length === 2) {
    ComponentType = props as ComponentType<T>;
    props = {} as PropsDefinitionInput<T>;
  }
  return register<T>(
    tag,
    props as PropsDefinitionInput<T>
  )(withSolid(ComponentType!));
}

function withNoShadowDOM<T extends object>(
  Component: ComponentType<T> = () => {}
) {
  return (props: T, options: ComponentOptions) => {
    noShadowDOM();
    const comp = (Component as FunctionComponent<T>)(props, options);
    return comp;
  };
}

function customShadowlessElement<T extends object>(
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

const correctElementType = <T>(
  component: CorrectComponentType<T>
): ComponentType<T> => {
  return (props: T, options) => {
    return component(props, options as CorrectComponentOptions);
  };
};

export { customElement, customShadowlessElement, correctElementType };
