export const cartFragment = `#graphql
    fragment CartFragment on Cart {
        id
        attributes {
          key
          value
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
        discountAllocations {
          discountedAmount {
            amount
            currencyCode
          }
        }
        discountCodes {
          applicable
          code
        }
        note
        totalQuantity
        lines(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            attributes {
              key
              value
            }
            cost {
              amountPerQuantity {
                amount
                currencyCode
              }
              compareAtAmountPerQuantity {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
            discountAllocations {
              discountedAmount {
                amount
                currencyCode
              }
            }
            id
            quantity
            sellingPlanAllocation {
              sellingPlan {
                id
                name
              }
            }
            variant: merchandise {
               __typename
              ... on ProductVariant {
                id
                title
                quantityAvailable
                availableForSale
                currentlyNotInStock
                requiresShipping
                selectedOptions {
                  name
                  value
                }
                sku
                product {
                  id
                  title
                  handle
                  onlineStoreUrl
                  featuredImage {
                    altText
                    height
                    id
                    thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })
                    small: url(transform: { maxWidth: 250, maxHeight: 250 })
                    large: url(transform: { maxWidth: 500, maxHeight: 500 })
                    original: url
                    width
                  }
                  options {
                    name
                    values
                  }
                  sellingPlanGroups(first: 1) {
                    nodes {
                      sellingPlans(first: 12) {
                        nodes {
                          id
                          name
                        }
                      }
                    }
                  }
                  variants(first: 50) {
                    nodes {
                      id
                      title
                      availableForSale
                    }
                  }
                }
                image {
                  altText
                  height
                  id
                  thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })
                  small: url(transform: { maxWidth: 250, maxHeight: 250 })
                  large: url(transform: { maxWidth: 500, maxHeight: 500 })
                  original: url
                  width
                }
              }
            }
          }
        }
      }
`;

export const createCartMutation = `#graphql
    mutation createCart($input: CartInput) {
      cartCreate(input:$input) {
        cart {
          id
        }
      }
    }
`;

export const getCartIdQuery = `#graphql
    query getCartId($id: ID!) {
        cart(id: $id) {
          id
        }
    }
`;

export const addItemsToCartMutation = `#graphql
    mutation addItemsToCart($id: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $id, lines: $lines) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
`;

export const removeItemsFromCartMutation = `#graphql
    mutation removeFromCart($id: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $id, lineIds: $lineIds) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
`;

export const updateItemsInCartMutation = `#graphql
    mutation updateCartLines($id: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $id, lines: $lines) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
`;

export const updateCartNoteMutation = `#graphql
    mutation updateCartNote($id: ID!, $note: String!) {
      cartNoteUpdate(cartId: $id, note: $note) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
`;

export const updateCartDiscountCodesMutation = `#graphql
    mutation updateCartDiscounts($id: ID!, $discountCodes: [String!]) {
      cartDiscountCodesUpdate(cartId: $id, discountCodes: $discountCodes) {
        cart {
          id
          discountCodes {
            code
            applicable
          }
        }
        userErrors {
          field
          message
        }
      }
    }
`;

export const getCartQuery = `#graphql
    query getCart($id: ID!) {
      cart(id: $id) {
        ...CartFragment
      }
    }
    ${cartFragment}
`;
