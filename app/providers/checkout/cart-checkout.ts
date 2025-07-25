import gql from "graphql-tag";
import type { CartLineInput } from "~/generated/graphql";
import { CountryCode } from "~/generated/graphql";
import type { SDK } from "~/graphqlWrapper";
import { storage } from "~/session.server";

type CartCheckoutOptions = {
  request: Request;
  lineItems: CartLineInput[];
};

export const createCartWithCheckout = async (
  sdk: SDK,
  { request, lineItems }: CartCheckoutOptions
) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const customerAccessToken = session.get("accessToken");
  
  // Create cart with line items
  const createResponse = await sdk.createCart({
    input: {
      lines: lineItems,
      buyerIdentity: {
        countryCode: CountryCode.Ro,
        customerAccessToken: customerAccessToken || undefined,
      },
    },
  });

  const cart = createResponse.cartCreate?.cart;
  const cartErrors = createResponse.cartCreate?.userErrors;

  if (!cart?.checkoutUrl || (cartErrors && cartErrors.length > 0)) {
    return {
      errors: cartErrors || [{ message: "Failed to create cart" }],
      checkoutUrl: null,
    };
  }

  // If customer is logged in and has a default address, update the cart with delivery preferences
  if (customerAccessToken && cart.id) {
    try {
      const addressResponse = await sdk.getDefaultAddress({
        customerAccessToken,
      });
      
      const defaultAddress = addressResponse.customer?.defaultAddress;
      
      if (defaultAddress) {
        // Update buyer identity with more details
        const buyerUpdateResponse = await sdk.updateCartBuyerIdentity({
          cartId: cart.id,
          buyerIdentity: {
            countryCode: CountryCode.Ro,
            customerAccessToken,
            email: addressResponse.customer?.email || undefined,
            phone: addressResponse.customer?.phone || undefined,
          },
        });

        if (buyerUpdateResponse.cartBuyerIdentityUpdate?.cart?.checkoutUrl) {
          return {
            errors: buyerUpdateResponse.cartBuyerIdentityUpdate?.userErrors || [],
            checkoutUrl: buyerUpdateResponse.cartBuyerIdentityUpdate.cart.checkoutUrl,
          };
        }
      }
    } catch (error) {
      console.error("Error updating cart buyer identity:", error);
    }
  }

  return {
    errors: [],
    checkoutUrl: cart.checkoutUrl,
  };
};

// GraphQL mutations for cart operations
gql`
  mutation createCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

gql`
  mutation updateCartBuyerIdentity(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
  ) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        checkoutUrl
        buyerIdentity {
          email
          phone
          countryCode
          customer {
            id
            email
          }
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;