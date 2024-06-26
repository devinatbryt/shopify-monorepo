import { z } from "zod";

const typeSchema = z.enum(["ProductVariant", "Cart"]);

export const NodeID = z
  .string()
  .refine((str) => str.startsWith("gid://shopify/"), {
    message: "Invalid Node ID",
  });

export const ID = (idType: z.infer<typeof typeSchema>) => {
  idType = typeSchema.parse(idType);
  return z
    .string()
    .transform((str) => `gid://shopify/${idType}/${str}`)
    .refine((str) => str.startsWith(`gid://shopify/${idType}/`), {
      message: `Invalid ${idType.toLowerCase()} id. Should follow the following structure: 'gid://shopify/${idType}/{id}"`,
    });
};

export const GID = (idType: z.infer<typeof typeSchema>) => {
  idType = typeSchema.parse(idType);
  return z.coerce
    .string()
    .refine((str) => str.startsWith(`gid://shopify/${idType}/`), {
      message: `Invalid ${idType.toLowerCase()} id. Should follow the following structure: 'gid://shopify/${idType}/{id}"`,
    });
};

const FetchCartVariables = z.object({
  id: GID("Cart"),
});

export const validateFetchCartVariables = (variables: unknown) =>
  FetchCartVariables.parse(variables);
