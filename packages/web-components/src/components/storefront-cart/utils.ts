// export function formatValue(format: string, value: unknown) {
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
