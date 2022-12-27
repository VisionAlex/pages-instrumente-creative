import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { AiTwotoneTag } from "react-icons/ai";
import { FadeIn } from "~/components/shared/FadeIn";
import { createSdk } from "~/graphqlWrapper";
import { getOrder } from "~/providers/customers/orders";
import { classNames } from "~/shared/utils/classNames";
import { formatDate } from "~/shared/utils/formatDate";
import {
  getFinancialStatus,
  getFulfillmentStatus,
} from "~/shared/utils/orders";

export const loader = async ({ params, context }: LoaderArgs) => {
  const id = atob(params.id as string);
  const sdk = createSdk(context);
  const orderResponse = await getOrder(sdk, { id, first: 10 });
  if (!orderResponse.node) {
    throw new Response("Not found", { status: 404 });
  }

  if (orderResponse.node.__typename !== "Order") {
    throw new Error("Eroare neasteptata");
  }
  return json({ order: orderResponse.node });
};

const Order: React.FC = () => {
  const { order } = useLoaderData<typeof loader>();
  console.log({ order });

  const shippingDiscount = order.shippingDiscountAllocations.reduce(
    (acc, item) => {
      return acc + parseInt(item.allocatedAmount.amount);
    },
    0
  );

  const shipppingCode =
    order.shippingDiscountAllocations[0]?.discountApplication?.__typename ===
    "DiscountCodeApplication"
      ? order.shippingDiscountAllocations[0]?.discountApplication?.code
      : null;

  return (
    <FadeIn>
      <h3 className="py-4">
        Comanda {order.name}{" "}
        <span className="font-medium text-subtitle">Plasată pe</span>{" "}
        {formatDate(order.processedAt, { includeTime: true })}
      </h3>
      <div className="border border-line">
        <h5 className="border-b border-line p-5 text-lg">Detaliile comenzii</h5>
        <ul>
          {order.lineItems.edges.map(({ node: item }) => {
            const discount = item.discountAllocations.reduce((acc, item) => {
              return acc + parseInt(item.allocatedAmount.amount);
            }, 0);
            const discountCode =
              item.discountAllocations[0]?.discountApplication.__typename ===
              "DiscountCodeApplication"
                ? item.discountAllocations[0]?.discountApplication.code
                : null;

            const price = parseInt(item.discountedTotalPrice.amount);

            const fullfilledItem = order.successfulFulfillments?.find(
              (fullfilledItem) => {
                return fullfilledItem.fulfillmentLineItems.edges.find(
                  (fulfilledLineItem) => {
                    return (
                      fulfilledLineItem.node.lineItem.variant?.id ===
                      item.variant?.id
                    );
                  }
                );
              }
            );

            const trackingNumber = fullfilledItem?.trackingInfo[0]?.number;
            const trackingUrl = fullfilledItem?.trackingInfo[0]?.url;
            const trackingCompany = fullfilledItem?.trackingCompany;

            return (
              <li className="p-4" key={item.variant?.id}>
                <div className="flex justify-between">
                  <div>
                    <div>
                      <span className="mr-4 rounded-xl bg-secondaryBackground px-4 text-sm text-subtitle">
                        x {item.currentQuantity}
                      </span>
                      {item.title}
                    </div>
                    <div className="text-subtitle">
                      {discount ? (
                        <div>
                          <div className="mt-2 flex items-center gap-2">
                            <AiTwotoneTag size={16} />
                            <span className="uppercase">{discountCode}</span>( -
                            {discount} lei)
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 py-2">
                      {fullfilledItem ? (
                        <span className="max-w-fit bg-secondaryBackground p-1 text-subtitle">
                          Comandă Îndeplinită
                        </span>
                      ) : null}

                      {trackingNumber ? (
                        <div>
                          <span className="text-subtitle">
                            {trackingCompany}
                          </span>{" "}
                          <span>{trackingNumber}</span>
                        </div>
                      ) : null}
                      {trackingUrl ? (
                        <a href={trackingUrl}>
                          <span className="flex h-[44px] w-fit items-center justify-center border border-primary bg-white px-4 tracking-wider text-primary antialiased transition-colors duration-300 hover:bg-primary hover:text-white">
                            Urmareste expedierea
                          </span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="min-w-max">
                    <p
                      className={classNames(
                        "text-subtitle",
                        discount ? "line-through" : ""
                      )}
                    >
                      {price} lei
                    </p>
                    {discount ? <p>{price - discount} lei</p> : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mx-4 border-t border-line">
          <div className="flex justify-between  py-4">
            <p>Subtotal</p>
            <p>{order.currentSubtotalPrice.amount}</p>
          </div>
          <div className="flex justify-between  py-4">
            <p>Transport</p>
            <p>{order.totalShippingPrice.amount}</p>
          </div>
          {shippingDiscount > 0 ? (
            <div className="flex items-start  justify-between py-4">
              <div>
                <span>Reducere transport </span>
                <div className="flex items-center gap-2 uppercase text-subtitle">
                  <AiTwotoneTag size={16} />
                  {shipppingCode}
                </div>
              </div>
              <p>-{shippingDiscount}</p>
            </div>
          ) : null}

          <div className="flex justify-between py-4">
            <p>Total</p>
            <p>{order.currentTotalPrice.amount}</p>
          </div>
        </div>
      </div>
      <div className="mt-10 border border-line">
        <h5 className="border-b border-line p-5 text-lg">
          Adresă de expediere
        </h5>
        <div className="p-4">
          <div>
            Starea plății:{" "}
            <span className="text-subtitle">
              {getFinancialStatus(order.financialStatus)}
            </span>
          </div>
          <div>
            Starea comenzii:{" "}
            <span className="text-subtitle">
              {getFulfillmentStatus(order.fulfillmentStatus)}
            </span>
          </div>
          <div className="mt-5 text-subtitle">
            <p>{order.shippingAddress?.name}</p>
            {order.shippingAddress?.formatted.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default Order;
