import gql from "graphql-tag";
import type { SDK } from "~/graphqlWrapper";
import { storage } from "~/session.server";

type GetCustomerOrdersOptions = {
  request: Request;
  after?: string;
};

export const getOrder = async (
  sdk: SDK,
  { id, first, last }: { id: string; first?: number; last?: number }
) => {
  return sdk.getOrder({
    id,
    first,
    last,
  });
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
    first: 25,
    after,
  });
};

gql`
  query getOrders(
    $customerAccessToken: String!
    $first: Int = 25
    $before: String
    $after: String
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(
        first: $first
        after: $after
        before: $before
        sortKey: PROCESSED_AT
        reverse: true
      ) {
        totalCount
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

gql`
  query getOrder($id: ID!, $first: Int = 20, $last: Int) {
    node(id: $id) {
      __typename
      id
      ... on Order {
        name
        processedAt
        discountApplications(first: 5) {
          edges {
            node {
              ... on DiscountCodeApplication {
                code
              }
            }
          }
        }
        shippingDiscountAllocations {
          allocatedAmount {
            amount
          }
          discountApplication {
            __typename
            ... on DiscountCodeApplication {
              code
            }
          }
        }
        canceledAt
        edited
        totalRefunded {
          amount
        }
        successfulFulfillments {
          fulfillmentLineItems(first: $first, last: $last) {
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            edges {
              cursor
              node {
                quantity
                lineItem {
                  variant {
                    id
                  }
                }
              }
            }
          }
          trackingCompany
          trackingInfo {
            url
            number
          }
        }
        fulfillmentStatus
        orderNumber
        cancelReason
        canceledAt
        currentSubtotalPrice {
          amount
        }
        totalShippingPrice {
          amount
        }
        currentTotalPrice {
          amount
        }
        customerUrl
        statusUrl
        financialStatus
        shippingAddress {
          name
          formatted
        }
        email
        lineItems(first: $first, last: $last) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            cursor
            node {
              title
              quantity
              currentQuantity
              discountedTotalPrice {
                amount
              }
              originalTotalPrice {
                amount
              }
              discountAllocations {
                allocatedAmount {
                  amount
                }
                discountApplication {
                  __typename
                  ... on DiscountCodeApplication {
                    code
                  }
                }
              }
              variant {
                id
                title
                product {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
