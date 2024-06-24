import { FRAGMENT_FIELDS } from "./const";

export type FragmentType = keyof typeof FRAGMENT_FIELDS;

export type FragmentDetails = Record<
  string,
  {
    name: string;
    field: string;
    type: FragmentType;
  }
>;
