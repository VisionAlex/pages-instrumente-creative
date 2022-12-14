import { Link } from "@remix-run/react";
import { FadeIn } from "~/components/shared/FadeIn";
import type { Orders } from "~/routes/account/index";
import { formatDate } from "~/shared/utils/formatDate";
import {
  getFinancialStatus,
  getFulfillmentStatus,
} from "~/shared/utils/orders";

type OrdersTableProps = {
  orders: Orders;
};

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <FadeIn className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-gray-900 sm:pl-6"
            >
              Comanda
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 lg:table-cell"
            >
              Data
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 sm:table-cell"
            >
              Starea Platii
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 sm:table-cell"
            >
              Starea Comenzii
            </th>
            <th
              scope="col"
              className="relative py-3.5 pl-3 pr-4 font-normal sm:pr-6"
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {orders.map((order) => (
            <tr key={order.orderNumber}>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                <Link to={`/account/orders/${btoa(order.id)}`}>
                  #{order.orderNumber}
                </Link>
                <dl className="font-normal lg:hidden">
                  <dd className="mt-1 truncate text-gray-700">
                    {formatDate(order.processedAt)}
                  </dd>
                  <dd className="mt-1 truncate text-gray-500 sm:hidden">
                    {getFulfillmentStatus(order.fulfillmentStatus)}
                  </dd>
                </dl>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {formatDate(order.processedAt)}
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {getFinancialStatus(order.financialStatus)}
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {getFulfillmentStatus(order.fulfillmentStatus)}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                {order.totalPrice.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </FadeIn>
  );
};
