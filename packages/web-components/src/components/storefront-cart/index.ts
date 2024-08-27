import {
  customShadowlessElement,
  correctElementType,
} from "../../utils/solid-element";
import { CartContext } from "./components";

customShadowlessElement(
  "cart-context",
  { debug: false },
  correctElementType(CartContext)
);

// import {
//   createEffect,
//   createMemo,
//   createRoot,
//   createSignal,
//   onCleanup,
//   on,
//   For,
//   Show,
//   createSelector,
//   mapArray,
//   batch,
// } from "https://cdn.jsdelivr.net/npm/solid-js/+esm";
// import html from "https://cdn.jsdelivr.net/npm/solid-js/html/+esm";
// import { insert } from "https://cdn.jsdelivr.net/npm/solid-js/web/+esm";
// import { unwrap } from "https://cdn.jsdelivr.net/npm/solid-js/store/+esm";
// import {
//   register,
//   createContext,
//   withProvider,
//   withConsumer,
//   compose,
//   noShadowDOM,
//   provide,
// } from "https://cdn.jsdelivr.net/npm/component-register/+esm";

// import debounce from "https://cdn.jsdelivr.net/npm/lodash.debounce/+esm";

// // Utility custom element functions

// function getContext(element) {
//   const elementContextSymbol = Object.getOwnPropertySymbols(element).find(
//     (s) => s.description === "element-context"
//   );
//   const contextSymbol = Object.getOwnPropertySymbols(
//     element[elementContextSymbol]
//   ).find((s) => s.description === "context");
//   return element[elementContextSymbol][contextSymbol];
// }

// function createProps(raw) {
//   const keys = Object.keys(raw);
//   const props = {};
//   for (let i = 0; i < keys.length; i++) {
//     const [get, set] = createSignal(raw[keys[i]]);
//     Object.defineProperty(props, keys[i], {
//       get() {
//         return get();
//       },
//       set(v) {
//         set(() => v);
//       },
//     });
//   }
//   return props;
// }

// function lookupContext(el) {
//   if (el.assignedSlot && el.assignedSlot._$owner)
//     return el.assignedSlot._$owner;
//   let next = el.parentNode;
//   while (
//     next &&
//     !next._$owner &&
//     !(next.assignedSlot && next.assignedSlot._$owner)
//   )
//     next = next.parentNode;
//   return next && next.assignedSlot ? next.assignedSlot._$owner : el._$owner;
// }

// function withSolid(ComponentType) {
//   return (rawProps, options) => {
//     const { element } = options;
//     return createRoot((dispose) => {
//       const props = createProps(rawProps);
//       element.addPropertyChangedCallback((key, val) => (props[key] = val));
//       element.addReleaseCallback(() => {
//         element.renderRoot.textContent = "";
//         dispose();
//       });
//       const comp = ComponentType(props, options);
//       return insert(element.renderRoot, comp);
//     }, lookupContext(element));
//   };
// }

// function withNoShadowDOM(Component) {
//   return (props, options) => {
//     noShadowDOM();
//     const comp = Component(props, options);
//     return comp;
//   };
// }

// const customShadowlessElement = (
//   tagName,
//   props = {},
//   Component = (props, options) => {},
//   ...rest
// ) =>
//   compose(
//     register(tagName, props),
//     withNoShadowDOM,
//     withSolid,
//     ...rest
//   )(Component);

// function formatValue(format, value) {
//   switch (format) {
//     case "currency":
//       return Shopify.formatMoney(value);
//     case "number":
//       return Number(value);
//     case "boolean":
//       return typeof value === "string"
//         ? value.toLowerCase() === "true"
//         : Boolean(value);
//     case "invert_boolean":
//       return typeof value === "string"
//         ? value.toLowerCase() === "false"
//         : !Boolean(value);
//     default:
//       return value;
//   }
// }

// function getValue(data, value) {
//   if (typeof value === "undefined" || !data) return undefined;

//   if (value.type === "primitive") {
//     return value.value;
//   }
//   if (value.type === "property") {
//     const keys = value.name.split(".").filter((key) => key.length > 0);
//     return keys.reduce((acc, key) => acc[key], data);
//   }

//   return null;
// }

// function invertResult(result, invert = false) {
//   if (invert) return !result;
//   return result;
// }

// function validateConditions(conditions, data) {
//   if (!data) return false;
//   const result = conditions.every((condition) => {
//     let valueA = getValue(data, condition.valueA),
//       valueB = getValue(data, condition.valueB),
//       result = false;

//     // console.log(valueA, valueB, condition, 'CART');

//     if (typeof valueA === "undefined" && typeof valueB === "undefined")
//       return false;

//     if (condition.type === "typeof") {
//       result = typeof valueA === valueB;
//     }

//     if (condition.type === "equals") {
//       result =
//         formatValue(condition.format, valueA) ===
//         formatValue(condition.format, valueB);
//     }

//     if (condition.type === "not_equals") {
//       result =
//         formatValue(condition.format, valueA) !==
//         formatValue(condition.format, valueB);
//     }

//     if (condition.type === "lt") {
//       result =
//         formatValue(condition.format, valueA) <
//         formatValue(condition.format, valueB);
//     }

//     if (condition.type === "lte") {
//       result =
//         formatValue(condition.format, valueA) <=
//         formatValue(condition.format, valueB);
//     }

//     if (condition.type === "gt") {
//       result =
//         formatValue(condition.format, valueA) >
//         formatValue(condition.format, valueB);
//     }

//     if (condition.type === "gte") {
//       result =
//         formatValue(condition.format, valueA) >=
//         formatValue(condition.format, valueB);
//     }

//     return invertResult(result, condition.invert);
//   });

//   return result;
// }

// function getTemplateContent(element, state) {
//   const tmpl = element.querySelector(`template[${state}]`);
//   if (!tmpl) return null;
//   return tmpl.content;
// }

// function getTargetElement(rootElement, target) {
//   if (!target) return rootElement;
//   const t = rootElement.querySelector(target);
//   if (!t) {
//     console.error(`target element not found: ${target}`);
//     return null;
//   }
//   return t;
// }

// function createFormattedValue(dataSource, props, isSelected) {
//   return createMemo(() => {
//     const d = dataSource();
//     if (!d) return undefined;
//     if (typeof d !== "object") return formatValue(props.format, d);
//     if (!props.propertyName)
//       throw new Error("cart-item: property-name is required");
//     if (props.propertyName === "isSelected") return isSelected();
//     const keys = props.propertyName.split(".").filter((key) => key.length > 0);
//     const v = keys.reduce((acc, key) => acc[key], d);
//     const formattedValue = formatValue(props.format, v);
//     return formattedValue;
//   });
// }

// function CartContext(props, { element }) {
//   const cart = provide(StorefrontCartContext, undefined, element);
//   console.log("CART CONTEXT", cart());
//   createEffect(on(cart, (cart) => console.log("CART", unwrap(cart))));
// }

// const StorefrontCartContext = createContext(() => {
//   createEffect(() => {
//     console.log(Shopify.StorefrontCart.cart());
//   });
//   return Shopify.StorefrontCart.cart;
// });

// const DataArrayContext = createContext(
//   (initial = { propertyPath: "", isSelected: false }) => {
//     const [propertyPath, setPropertyPath] = createSignal(initial.propertyPath);
//     const [isSelected, setIsSelected] = createSignal(initial.isSelected);

//     const item = createMemo(() => {
//       const cart = Shopify.StorefrontCart.cart();
//       const path = propertyPath();
//       if (!path) return null;
//       const keys = path.split(".").filter((key) => key.length > 0);
//       return (
//         keys.reduce((acc, key) => {
//           if (!acc) return null;
//           if (!acc.hasOwnProperty(key)) return null;
//           return acc[key];
//         }, cart) || null
//       );
//     });

//     return {
//       item,
//       isSelected,
//       _propertyPath: propertyPath,
//       _setPropertyPath: setPropertyPath,
//       _setIsSelected: setIsSelected,
//     };
//   }
// );

// const DataArrayRootItemContext = createContext(
//   (initial = { position: 0, target: "", element: null }) => {
//     const [position, setPosition] = createSignal(initial.position);
//     const [target, setTarget] = createSignal(initial.target);
//     const [element, setElement] = createSignal(initial.element);

//     const rootElement = createMemo(() => {
//       const t = target();
//       const p = position();
//       const e = element();
//       if (!t || !e) return null;

//       const el = e.closest(t);

//       if (!el) return null;

//       return Array.from(el.children)[p];
//     });

//     return {
//       element: rootElement,
//       _setPosition: setPosition,
//       _setTarget: setTarget,
//       _setElement: setElement,
//     };
//   }
// );

// const DataListenerStatusContext = createContext(
//   (initial = { status: "default", error: null }) => {
//     const [status, setStatus] = createSignal(initial.status);
//     const [error, setError] = createSignal(initial.error);
//     return { status, _setStatus: setStatus, error, _setError: setError };
//   }
// );

// function CartDataContext(props, options) {
//   const { _setPropertyPath, _setIsSelected } = getContext(options.element);

//   createEffect(() => {
//     batch(() => {
//       _setPropertyPath(props.propertyPath);
//       _setIsSelected(props.isSelected || false);
//     });
//   });
// }

// /**
//  * Renders a formatted value from a data source.
//  *
//  * @param {function} dataSource - A function that returns the data source.
//  * @param {object} props - The properties of the component.
//  * @param {string} props.propertyName - The property name to access from the data source.
//  * @param {string} props.format - The format to apply to the value.
//  * @returns {JSX.Element} The formatted value.
//  */
// function CartData(props, options) {
//   const dataSource = options?.itemContext?.item || options.cart;
//   const isSelected = options?.itemContext?.isSelected || (() => false);

//   const value = createFormattedValue(dataSource, props, isSelected);

//   return html`
//     <${Show} when=${() => typeof value() !== "undefined" && value() !== null}>
//       ${() => `${value()}`}
//     <//>
//   `;
// }

// function CartLoadingState(props, options) {
//   const cart = Shopify.StorefrontCart;

//   const templates = {
//     pending: getTemplateContent(options.element, "pending"),
//     error: getTemplateContent(options.element, "error"),
//     success: getTemplateContent(options.element, "success"),
//   };

//   let previousState = null;

//   const cartState = createMemo(() => {
//     const state = cart?.status;
//     // const state = 'pending';
//     if (!templates[state]) return previousState;
//     previousState = state;
//     return state;
//   });

//   return html`
//     <${Show} when=${() => cart}>
//       ${() => {
//         const state = cartState();
//         if (!templates[state]) return null;
//         const children = Array.from(templates[state].cloneNode(true).children);
//         return children;
//       }}
//     <//>
//   `;
// }

// /**
//  * Renders a list of items from a data source.
//  *
//  * @param {object} props - The properties of the component.
//  * @param {string} props.propertyPath - The property path to access from the data source.
//  * @param {string} props.selector - The selector to filter the items.
//  * @param {HTMLTemplateElement} props.item - The template for each item.
//  * @returns {JSX.Element} The list of items.
//  */
// function CartDataArray(props, options) {
//   const itemTMPL = options.element.querySelector("template[item]");
//   if (!itemTMPL)
//     return console.error("cart-data-array: item template is required!");
//   const data = options?.itemContext?.item || options.cart;

//   const isSelected = createSelector(() => data()[props.selector]);

//   const array = createMemo(() => {
//     const d = data();
//     if (!props.propertyPath) return [];
//     if (!d) return [];
//     const keys = props.propertyPath.split(".").filter((key) => key.length > 0);
//     const value = keys.reduce((acc, key) => acc[key], d);
//     if (!value) return [];
//     return value;
//   });

//   return html`
//     <${Show} when=${() => data() && (array()?.length || 0) > 0}>
//       <${For} each=${() => array()}>
//         ${(item, idx) => html`
//           <cart-data-context
//             is-selected=${() => {
//               if (!props.selector) return false;
//               return isSelected(item[props.selector]);
//             }}
//             property-path=${() => {
//               const p = options?.itemContext?._propertyPath();
//               const relPath = `${props.propertyPath}.${idx()}`;
//               if (!p) return relPath;
//               return `${p}.${relPath}`;
//             }}
//           >
//             ${() => itemTMPL.content.cloneNode(true)}
//           </cart-data-context>
//         `}
//       <//>
//     <//>
//   `;
// }

// /**
//  * The `cart-data-injection` element is used to inject data into a target element.
//  *
//  * @param {object} props - The properties of the element.
//  * @param {string} props.target - The CSS selector of the target element.
//  * @param {string} props.attributeName - The name of the attribute to inject.
//  * @param {string} props.propertyName - The name of the property to inject.
//  * @param {string} props.format - The format to apply to the value before injection.
//  * @param {string} props.injectionType - The type of injection to perform. Can be 'attribute' or 'property'.
//  * @param {object} options - The options of the element.
//  * @param {object} options.element - The element being rendered.
//  */
// function CartDataInjection(props, options) {
//   if (!props.target && !options?.root?.element)
//     return console.error("cart-data-injection: target attribute is required!");
//   if (!props.attributeName)
//     return console.error(
//       "cart-data-injection: attribute-name attribute is required!"
//     );
//   if (!props.propertyName)
//     return console.error(
//       "cart-data-injection: property-name attribute is required!"
//     );

//   /**
//    * The `dataSource` function returns the data source to be injected. It can be either the `options.itemContext.item` or the `options.cart` object.
//    */
//   const dataSource = options?.itemContext?.item || options.cart;

//   /**
//    * The `isSelected` function returns a boolean indicating whether the data source is currently selected. It is derived from the `options.itemContext.isSelected` signal or a boolean value if `options.itemContext` is not defined.
//    */
//   const isSelected = options?.itemContext?.isSelected || (() => false);

//   /**
//    * The `value` function returns the value to be injected into the target element. It is created by calling the `createFormattedValue` function with the `dataSource` and the `props` of the element.
//    */
//   const value = createFormattedValue(dataSource, props, isSelected);

//   /**
//    * The `createEffect` function creates an effect that listens to changes in the `value`, `target`, `attributeName`, and `injectionType` signals. It performs the injection based on these signals.
//    */
//   createEffect(
//     on(
//       () => {
//         const rootElement = options?.root?.element() || options.element;
//         return {
//           target: getTargetElement(rootElement, props.target),
//           value: value(),
//           attributeName: props.attributeName,
//           injectionType: props.injectionType,
//         };
//       },
//       ({ value, target, attributeName, injectionType }) => {
//         if (typeof value === "undefined") return;
//         switch (injectionType) {
//           case "attribute":
//             if (value) target.setAttribute(attributeName, value);
//           case "property":
//             target[attributeName] = value;
//           default:
//             return;
//         }
//       }
//     )
//   );
// }

// function CartDataConditions(props, options) {
//   const dataSource = options?.itemContext?.item || options.cart;
//   const conditionTemplates = Array.from(options.element.children).filter(
//     (child) => child.tagName === "TEMPLATE" && child.hasAttribute("conditions")
//   );
//   if (!conditionTemplates.length)
//     return console.error(
//       "cart-data-conditions: no templates found with any conditions attribute!"
//     );

//   const allConditions = createMemo(() =>
//     conditionTemplates.map((tmpl) => {
//       const conditions = tmpl.getAttribute("conditions");
//       if (!conditions)
//         console.warn("cart-data-conditions: conditions attribute is required!");

//       try {
//         return JSON.parse(conditions);
//       } catch (e) {
//         return [];
//       }
//     })
//   );

//   return html`
//     <${For} each=${() => conditionTemplates}>
//       ${(tmpl, idx) => {
//         const conditions = allConditions()[idx()];
//         return html`
//           <${Show} when=${() => validateConditions(conditions, dataSource())}>
//             ${() => Array.from(tmpl.content.cloneNode(true).children)}
//           <//>
//         `;
//       }}
//     <//>
//   `;
// }

// /**
//  * The `dataSource` function returns the data source to be listened to. It can be either the `options.itemContext.item` or the `options.cart` object.
//  *
//  * @param {object} options - The options of the element.
//  * @param {object} options.element - The element being rendered.
//  * @returns {object} The data source.
//  */
// function CartDataListener(props, options) {
//   const { _setStatus, _setError } = getContext(options.element);
//   const dataSource = options?.itemContext?.item || options.cart;

//   createEffect(
//     on(
//       () => ({
//         element: options.element,
//         method: props.method,
//         on: props.on,
//         preventDefault: props.preventDefault,
//         data: dataSource(),
//         format: props.format,
//         delay: props.delay,
//         resetForm: props.resetForm,
//         resetStatusDelay: props.resetStatusDelay,
//         conditions: props.conditions,
//       }),
//       ({
//         element,
//         method,
//         on,
//         preventDefault,
//         data,
//         format,
//         delay,
//         resetForm,
//         resetStatusDelay,
//       }) => {
//         if (!method)
//           return console.error(
//             "cart-item-listener: method property is required!"
//           );
//         if (!on)
//           return console.error("cart-item-listener: on property is required!");

//         function onEvent(e) {
//           const cart = Shopify.StorefrontCart;

//           function handleStatus(promise) {
//             _setStatus("loading");
//             return promise
//               .then((data) => {
//                 _setStatus("success");
//                 return data;
//               })
//               .catch((err) => {
//                 console.error(err);
//                 batch(() => {
//                   _setError(err);
//                   _setStatus("error");
//                 });
//                 return err;
//               })
//               .finally(() => {
//                 if (resetStatusDelay) {
//                   setTimeout(() => {
//                     _setStatus("default");
//                   }, resetStatusDelay);
//                 }
//               });
//           }

//           if (on === "submit") {
//             const formData = new FormData(e.target);
//             const formObj = Object.fromEntries(formData.entries());

//             function reset(data) {
//               if (resetForm) e.target.reset();
//               return data;
//             }

//             switch (method) {
//               case "updateItem":
//                 return handleStatus(
//                   cart.updateItem({
//                     ...data,
//                     ...formObj,
//                   })
//                 ).finally(reset);
//               case "removeItem":
//                 return handleStatus(cart.removeItem(formObj.id)).finally(reset);
//               case "addDiscountCode":
//                 return handleStatus(
//                   cart.addDiscountCode(formObj.code.trim())
//                 ).finally(reset);
//               case "removeDiscountCode":
//                 return handleStatus(
//                   cart.removeDiscountCode(formObj.code)
//                 ).finally(reset);
//               case "updateNote":
//                 return handleStatus(cart.updateNote(formObj.note)).finally(
//                   reset
//                 );
//               default:
//                 return;
//             }
//           } else {
//             switch (method) {
//               case "removeItem":
//                 return handleStatus(cart.removeItem(data.key));
//               case "updateItemQuantity":
//                 return handleStatus(
//                   cart.updateItem({
//                     ...data,
//                     id: data.key,
//                     quantity: formatValue(format, e.target.value),
//                   })
//                 );
//               case "updateItemVariant":
//                 return handleStatus(
//                   cart.updateItem({
//                     ...data,
//                     id: data.key,
//                     merchandiseId: formatValue(format, e.target.value),
//                   })
//                 );
//               case "updateNote":
//                 return handleStatus(cart.updateNote(e.target.value));
//               default:
//                 return;
//             }
//           }
//         }

//         const handleEvent = debounce(onEvent, delay);

//         function initialEvent(e) {
//           if (preventDefault) e.preventDefault();
//           return handleEvent(e);
//         }

//         element.addEventListener(on, initialEvent);

//         return onCleanup(() => {
//           element.removeEventListener(on, initialEvent);
//         });
//       }
//     )
//   );
// }

// function CartDataListenerStatus(props, options) {
//   const { status, error } = options.listener;

//   if (!status)
//     return console.error(
//       "cart-data-listener-status: no listener context provided!"
//     );

//   const templates = {
//     default: getTemplateContent(options.element, "default"),
//     loading: getTemplateContent(options.element, "loading"),
//     success: getTemplateContent(options.element, "success"),
//     error: getTemplateContent(options.element, "error"),
//   };

//   let previousState = null;

//   const currentStatus = createMemo(() => {
//     const s = status();
//     if (!templates[s]) return previousState;
//     previousState = s;
//     return s;
//   });

//   return html`
//     <${Show} when=${true}>
//       ${() => {
//         const state = currentStatus();
//         const children = Array.from(templates[state].cloneNode(true).children);
//         return children;
//       }}
//     <//>
//   `;
// }

// function CartDataArrayInjection(props, options) {
//   const itemTMPL = options.element.querySelector("template[item]");
//   if (!itemTMPL)
//     return console.error("cart-data-array: item template is required!");
//   const data = options?.itemContext?.item || options.cart;

//   const isSelected = createSelector(() => {
//     if (!data()) return null;
//     return data()[props.selector];
//   });

//   const array = createMemo(() => {
//     const d = data();
//     if (!props.propertyPath) return [];
//     if (!d) return [];
//     const keys = props.propertyPath.split(".").filter((key) => key.length > 0);
//     const value = keys.reduce((acc, key) => acc[key], d);
//     if (!value) return [];
//     return value;
//   });

//   const children = createMemo(
//     mapArray(array, (item, idx) => {
//       const itemEl = itemTMPL.content.cloneNode(true);
//       if (props.wrapInnerChild) {
//         const firstItem = itemEl.firstElementChild;
//         const children = firstItem.children;

//         const wrapper = html`
//           <cart-data-context
//             is-selected=${() => {
//               if (!props.selector) return false;
//               return isSelected(item[props.selector]);
//             }}
//             property-path=${() => {
//               const p = options?.itemContext?._propertyPath();
//               const relPath = `${props.propertyPath}.${idx()}`;
//               if (!p) return relPath;
//               return `${p}.${relPath}`;
//             }}
//           >
//             <cart-data-array-root-item-context
//               position=${idx}
//               target=${() => props.target}
//             >
//               ${() => Array.from(children)}
//             </cart-data-array-root-item-context>
//           </cart-data-context>
//         `;

//         firstItem.replaceChildren(wrapper);
//         return firstItem;
//       }
//     })
//   );

//   createEffect(
//     on(
//       () => {
//         const rootElement = options?.root?.element() || options.element;
//         return {
//           target: getTargetElement(rootElement, props.target),
//           children: children(),
//         };
//       },
//       ({ children, target }) => {
//         if (!target) return;
//         target.replaceChildren(...children);
//       }
//     )
//   );
// }

// function CartDataArrayRootItemContext(props, { element }) {
//   const { _setElement, _setPosition, _setTarget } = getContext(element);
//   createEffect(
//     on(
//       () => ({ target: props.target, position: props.position }),
//       ({ target, position }) => {
//         batch(() => {
//           _setTarget(target);
//           _setPosition(position);
//           _setElement(element);
//         });
//       }
//     )
//   );
// }

// customShadowlessElement("cart-context", {}, CartContext);

// customShadowlessElement(
//   "cart-data-context",
//   {
//     propertyPath: "",
//     isSelected: false,
//   },
//   CartDataContext,
//   withProvider(DataArrayContext),
//   withConsumer(DataArrayContext, "itemContext")
// );

// customShadowlessElement(
//   "cart-data-array",
//   {
//     propertyPath: "",
//     selector: "",
//   },
//   CartDataArray,
//   withConsumer(StorefrontCartContext, "cart"),
//   withConsumer(DataArrayContext, "itemContext")
// );

// customShadowlessElement(
//   "cart-data",
//   {
//     propertyName: "",
//     format: "",
//   },
//   CartData,
//   withConsumer(StorefrontCartContext, "cart"),
//   withConsumer(DataArrayContext, "itemContext")
// );

// customShadowlessElement(
//   "cart-data-injection",
//   {
//     target: "",
//     attributeName: "",
//     propertyName: "",
//     format: "",
//     injectionType: "attribute",
//   },
//   CartDataInjection,
//   withConsumer(StorefrontCartContext, "cart"),
//   withConsumer(DataArrayContext, "itemContext"),
//   withConsumer(DataArrayRootItemContext, "root")
// );

// customShadowlessElement(
//   "cart-data-array-root-item-context",
//   {
//     target: "",
//     position: 0,
//   },
//   CartDataArrayRootItemContext,
//   withProvider(DataArrayRootItemContext)
// );

// customShadowlessElement(
//   "cart-data-array-injection",
//   {
//     target: "",
//     propertyPath: "",
//     selector: "",
//     wrapInnerChild: false,
//   },
//   CartDataArrayInjection,
//   withConsumer(StorefrontCartContext, "cart"),
//   withConsumer(DataArrayContext, "itemContext"),
//   withConsumer(DataArrayRootItemContext, "root")
// );

// customShadowlessElement(
//   "cart-data-conditions",
//   {},
//   CartDataConditions,
//   withConsumer(StorefrontCartContext, "cart"),
//   withConsumer(DataArrayContext, "itemContext")
// );

// customShadowlessElement(
//   "cart-data-listener",
//   {
//     on: "click",
//     method: "",
//     preventDefault: true,
//     format: "",
//     delay: 0,
//     resetForm: false,
//     resetStatusDelay: 0,
//   },
//   CartDataListener,
//   withProvider(DataListenerStatusContext),
//   withConsumer(StorefrontCartContext, "cart"),
//   withConsumer(DataArrayContext, "itemContext")
// );

// customShadowlessElement(
//   "cart-data-listener-status",
//   {},
//   CartDataListenerStatus,
//   withConsumer(DataListenerStatusContext, "listener")
// );

// customShadowlessElement(
//   "cart-loading-state",
//   { ignoredStates: [] },
//   CartLoadingState
// );
