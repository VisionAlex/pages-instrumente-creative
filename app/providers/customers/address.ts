import gql from "graphql-tag";
import type { SDK } from "~/graphqlWrapper";
import { storage } from "~/session.server";

export const getAddresses = async (sdk: SDK, request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string") return null;
  return sdk.getAddresses({ customerAccessToken: accessToken });
};

export const getDefaultAddress = async (sdk: SDK, request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string") return null;
  return sdk.getDefaultAddress({ customerAccessToken: accessToken });
};

export const deleteAddress = async (sdk: SDK, id: string, request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string") return null;
  return sdk.customerAddressDelete({ customerAccessToken: accessToken, id });
};

gql`
  query getAddresses($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      addresses(first: 20) {
        edges {
          node {
            id
            name
            formatted
          }
        }
      }
      defaultAddress {
        id
        name
        formatted
      }
    }
  }
`;

gql`
  query getDefaultAddress($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        firstName
        lastName
        address1
        address2
        city
        company
        country
        province
        phone
        zip
      }
    }
  }
`;

gql`
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`;
