import type { FetchResponse, ItemAddInput, ItemAddOptions } from "./types";
import { ROUTES } from "./constants";
import { flattenObject, objectToFormData } from "./utils";

async function addItems(items: ItemAddInput[], options: ItemAddOptions = {}) {
  const url = `${ROUTES.ADD}`;
  let requestInit: RequestInit = {
    method: "POST",
  };

  if (options.contentType === "form-data") {
    requestInit = {
      ...requestInit,
      body: objectToFormData(flattenObject(items, "items")),
    };
  } else {
    requestInit = {
      ...requestInit,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    };
  }

  const response = await fetch(url, requestInit);

  if (!response.ok) {
    throw new Error(`Failed to add items to cart: ${response.statusText}`);
  }

  const data = (await response.json()) as FetchResponse;

  if (data?.status !== 200) {
    throw new Error(`${data.message} - Reason: ${data.description}`);
  }

  return data;
}

export const AJAX = {
  add: {
    async item(
      item: ItemAddInput,
      options: ItemAddOptions = { contentType: "json" }
    ) {
      return addItems([item], options);
    },
    items: addItems,
  },
};
