import formatId from "./formatId";

function convertObjToKeyValArray(o: { [key: string]: any }) {
  return Object.keys(o).map(function (key) {
    return {
      key: key,
      value: o[key],
    };
  });
}

export default function convertCartToInput(cart: any) {
  const result = {
    note: cart.note || null,
    attributes: convertObjToKeyValArray(cart.attributes || {}),
    lines: (cart.items || []).map(function (line: any) {
      return {
        attributes: convertObjToKeyValArray(line.properties || []),
        quantity: line.quantity || 1,
        merchandiseId: formatId(`ProductVariant`, line.id),
      };
    }),
  };
  return result;
}
