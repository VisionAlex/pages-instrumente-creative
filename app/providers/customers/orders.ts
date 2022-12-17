import gql from "graphql-tag";
import type { SDK } from "~/graphqlWrapper";
import { storage } from "~/session.server";

type GetCustomerOrdersOptions = {
  request: Request;
  after?: string;
};

export const getCustomerOrders = async (
  sdk: SDK,
  { request, after }: GetCustomerOrdersOptions
) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string")
    throw new Error("No access token found");

  return sdk.getOrders({
    customerAccessToken: accessToken,
    first: 10,
    after,
  });
};

gql`
  query getOrders(
    $customerAccessToken: String!
    $first: Int = 10
    $after: String
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(
        first: $first
        after: $after
        sortKey: PROCESSED_AT
        reverse: true
      ) {
        pageInfo {
          startCursor
          hasNextPage
          hasPreviousPage
          endCursor
        }
        edges {
          node {
            id
            orderNumber
            processedAt
            totalPrice {
              amount
            }
            fulfillmentStatus
            financialStatus
            statusUrl
          }
        }
      }
    }
  }
`;
