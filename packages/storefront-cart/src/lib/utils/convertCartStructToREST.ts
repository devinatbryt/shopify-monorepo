import type { CartFragmentFragment } from "../../types/storefront.generated";
import parseId from "./parseId";

export default function convertCartStructToREST(cart: CartFragmentFragment) {
  const line_item_discount_totals = cart.lines.nodes.reduce(
    (total, line) =>
      total +
      line.discountAllocations.reduce(
        (total, discount) =>
          total + parseFloat(discount.discountedAmount.amount) * 100,
        0
      ),
    0
  );

  const discount_total = cart.discountAllocations.reduce(
    (total, discount) =>
      total + parseFloat(discount.discountedAmount.amount) * 100,
    0
  );

  const subtotal =
    parseFloat(cart.cost.subtotalAmount.amount) * 100 +
    line_item_discount_totals;

  return {
    ...cart,
    item_count: cart.totalQuantity,
    discountCodes: cart.discountCodes.filter((code) => code.applicable),
    items: cart.lines.nodes
      .map((line) => {
        const price = parseFloat(line.cost.amountPerQuantity.amount) * 100;

        const line_price = parseFloat(line.cost.totalAmount.amount) * 100;

        const original_line_price =
          parseFloat(line.cost.subtotalAmount.amount) * 100;

        const discount_amount = line.discountAllocations.reduce(
          (total, discount) =>
            total + parseFloat(discount.discountedAmount.amount) * 100,
          0
        );

        const sellingPlan = line?.sellingPlanAllocation?.sellingPlan;

        const isDefaultVariant = line.variant.product.options.some(
          (option) =>
            option.name === "Title" && option.values.includes("Default Title")
        );

        const sellingPlanGroup = line?.variant?.product?.sellingPlanGroups
          ?.nodes[0] || {
          sellingPlans: { nodes: [] },
        };

        const sellingPlans = sellingPlanGroup.sellingPlans.nodes.map(
          (plan) => ({
            id: parseId(plan.id),
            name: plan.name,
          })
        );

        let max = line.variant.quantityAvailable;

        if (line.variant.currentlyNotInStock) max = Infinity;
        if (line.variant.availableForSale && (max || 0) < 1) max = Infinity;

        const properties = line.attributes.reduce(
          (props, attr) => {
            if (!attr.value) return props;
            props[attr.key] = attr.value;
            return props;
          },
          {} as Record<string, string>
        );

        const url = new URL(
          `https://example.com/products/${line.variant.product.handle}`
        );

        if (line.variant.id) {
          url.searchParams.set("variant", parseId(line.variant.id));
        }

        if (sellingPlan) {
          url.searchParams.set("selling_plan", parseId(sellingPlan.id));
        }

        return {
          available: line.variant.availableForSale,
          isInStock: !line.variant.currentlyNotInStock,
          properties,
          visible_properties: line.attributes.filter(
            (attr) => !attr.key.startsWith("_")
          ),
          attributes: line.attributes,
          price,
          line_price,
          discount_amount,
          product_id: parseId(line.variant.product.id),
          selected_options: line.variant.selectedOptions || [],
          requires_shipping: line.variant.requiresShipping,
          original_line_price,
          variant_title: line.variant.title,
          product_title: line.variant.product.title,
          title: isDefaultVariant
            ? line.variant.product.title
            : `${line.variant.product.title} - ${line.variant.title}`,
          image:
            line.variant.image || line.variant.product.featuredImage || null,
          key: parseId(line.id),
          id: parseId(line.variant.id),
          variant_id: parseId(line.variant.id),
          handle: line.variant.product.handle,
          selling_plan: {
            id: sellingPlan?.id ? parseId(sellingPlan.id) : undefined,
            name: sellingPlan?.name ? sellingPlan.name : undefined,
          },
          selling_plans: sellingPlans,
          quantity: line.quantity,
          quantity_rule: {
            min: 1,
            max: max,
            step: 1,
          },
          sku: line.variant.sku,
          url: url.pathname + url.search,
          variants: line.variant.product.variants.nodes.map((variant) => ({
            id: parseId(variant.id),
            title: variant.title,
            available: variant.availableForSale,
          })),
        };
      })
      .reverse(),
    original_total_price: subtotal,
    discounted_subtotal: subtotal - discount_total - line_item_discount_totals,
    discount_total,
    total_price: parseFloat(cart.cost.totalAmount.amount) * 100,
    note: cart.note,
    has_note: cart.note !== "",
    requires_shipping: cart.lines.nodes.some(
      (item) => item.variant.requiresShipping
    ),
  };
}
