import { z } from "zod";

const inputSchema = z
  .string()
  .refine((arg) => arg.startsWith("gid://shopify/"));

export default function parseId(id: string) {
  id = inputSchema.parse(id);
  const idArray = id.split("/");
  const actualId = idArray[idArray.length - 1];

  return actualId;
}
