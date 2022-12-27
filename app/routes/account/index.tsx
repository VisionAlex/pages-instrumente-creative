import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import type { GetOrdersQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { OrdersTable } from "~/pages/orders/OrdersTable";
import { getCustomerOrders } from "~/providers/customers/orders";

export const loader: LoaderFunction = async ({ request, context }) => {
  const sdk = createSdk(context);
  const response = await getCustomerOrders(sdk, { request });
  if (!response.customer) throw new Error("User not found");
  const orders = response.customer.orders.edges.map((edge) => edge.node);
  const pageInfo = response.customer.orders.pageInfo;
  return json({ orders, pageInfo });
};

export type Orders = NonNullable<
  GetOrdersQuery["customer"]
>["orders"]["edges"][0]["node"][];

export type LoaderData = {
  orders: Orders;
  pageInfo: NonNullable<GetOrdersQuery["customer"]>["orders"]["pageInfo"];
};

const Account: React.FC = () => {
  const { orders } = useLoaderData<LoaderData>();
  return (
    <>
      <OrdersTable orders={orders} />
    </>
  );
};

export default Account;
