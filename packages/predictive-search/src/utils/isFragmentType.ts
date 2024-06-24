import type { FragmentType } from "./types";
import { FRAGMENT_FIELDS } from "./const";
export default function isFragmentType(type: string): type is FragmentType {
  if (Object.keys(FRAGMENT_FIELDS).indexOf(type) === -1) return false;
  return true;
}
