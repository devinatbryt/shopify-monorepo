import { z } from "zod";

const inputSchema = z.number().or(z.string().regex(/^\d+$/));

const resource = z.enum([
  "Cart",
  "Product",
  "ProductVariant",
  "SellingPlan",
  "CartLine",
]);

export default function formatId(
  id: unknown,
  resourceType: z.infer<typeof resource>
) {
  const newId = inputSchema.parse(id);
  resourceType = resource.parse(resourceType);
  return `gid://shopify/${resourceType}/${newId.toString()}`;
}
