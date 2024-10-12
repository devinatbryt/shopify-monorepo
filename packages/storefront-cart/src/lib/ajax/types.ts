type Properties = Record<string, string>;

export type ItemAddInput = {
  id: string | number;
  quantity: string | number;
  selling_plan?: string | number | null;
  properties?: Properties;
};

export type DefaultOptions = {
  contentType?: "json" | "form-data";
};

export type ResponseError = {
  description: string;
  message: string;
};

export type FetchResponse = { status: number } & ResponseError;

export type ItemAddOptions = DefaultOptions & {};
