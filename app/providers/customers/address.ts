import gql from "graphql-tag";
import { sdk } from "graphqlWrapper";
import { storage } from "~/session.server";

export const getAddresses = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string") return null;
  return sdk.getAddresses({ customerAccessToken: accessToken });
};

export const getDefaultAddress = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string") return null;
  return sdk.getDefaultAddress({ customerAccessToken: accessToken });
};

gql`
  query getAddresses($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      addresses(first: 5) {
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
