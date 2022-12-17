import gql from "graphql-tag";
import type { CheckoutLineItemInput } from "~/generated/graphql";
import { CountryCode } from "~/generated/graphql";
import type { SDK } from "~/graphqlWrapper";
import { storage } from "~/session.server";

type CheckoutWithWebUrlOptions = {
  request: Request;
  lineItems: CheckoutLineItemInput[];
};

export const checkoutWithWebUrl = async (
  sdk: SDK,
  { request, lineItems }: CheckoutWithWebUrlOptions
) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const customerAccessToken = session.get("accessToken");
  const createResponse = await sdk.createCheckout({
    input: {
      lineItems,
      buyerIdentity: {
        countryCode: CountryCode.Ro,
      },
    },
  });
  const webUrl = createResponse.checkoutCreate?.checkout?.webUrl;
  if (!webUrl) {
    return {
      errors: createResponse.checkoutCreate?.checkoutUserErrors,
      webUrl: webUrl,
    };
  }
  if (customerAccessToken) {
    const checkoutId = createResponse.checkoutCreate?.checkout?.id;
    if (!checkoutId) {
      return { errors: [{ message: "No checkout id" }], webUrl: null };
    }
    const associateWithUserResponse = await sdk.associateCustomerWithCheckout({
      checkoutId,
      customerAccessToken,
    });
    if (
      associateWithUserResponse.checkoutCustomerAssociateV2
        ?.checkoutUserErrors &&
      associateWithUserResponse.checkoutCustomerAssociateV2.checkoutUserErrors
        .length > 0
    ) {
      return {
        errors:
          associateWithUserResponse?.checkoutCustomerAssociateV2
            ?.checkoutUserErrors,
        webUrl: createResponse.checkoutCreate?.checkout?.webUrl,
      };
    }
    const addressResponse = await sdk.getDefaultAddress({
      customerAccessToken,
    });
    const defaultAddress = addressResponse.customer?.defaultAddress;
    if (defaultAddress) {
      const associateAddressResponse =
        await sdk.checkoutShippingAddressUpdateV2({
          checkoutId,
          shippingAddress: {
            ...defaultAddress,
          },
        });
      return {
        errors:
          associateAddressResponse.checkoutShippingAddressUpdateV2
            ?.checkoutUserErrors,
        webUrl:
          associateAddressResponse.checkoutShippingAddressUpdateV2?.checkout
            ?.webUrl,
      };
    }
  }
  return {
    errors: createResponse.checkoutCreate?.checkoutUserErrors,
    webUrl: createResponse.checkoutCreate?.checkout?.webUrl,
  };
};

gql`
  mutation createCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

gql`
  mutation checkoutShippingAddressUpdateV2(
    $shippingAddress: MailingAddressInput!
    $checkoutId: ID!
  ) {
    checkoutShippingAddressUpdateV2(
      shippingAddress: $shippingAddress
      checkoutId: $checkoutId
    ) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        id
        webUrl
      }
    }
  }
`;

gql`
  mutation associateCustomerWithCheckout(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`;
