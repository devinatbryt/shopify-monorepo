export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
}

export function flattenObject(
  obj: any,
  prefix: string = ""
): Record<string, any> {
  let result: Record<string, any> = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = `${prefix}[${key}]`;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}
