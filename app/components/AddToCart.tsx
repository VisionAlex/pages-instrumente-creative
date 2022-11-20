import { Form, useLocation } from "@remix-run/react";
import React from "react";
import { BsBasket } from "react-icons/bs";
import type { Product } from "~/types";

interface Props {
  product: Product;
  openModal: (product: Product) => void;
}

export const AddToCart: React.FC<Props> = ({ product, openModal }) => {
  const location = useLocation();
  const isProductAvailable = product.availableForSale;
  const hasOnlyOneVariant = product.variants.edges.length === 1;
  const variant = product.variants.edges[0].node;
  const isVariantAvailable = variant.availableForSale;
  const isReadyToBuy =
    isProductAvailable && hasOnlyOneVariant && isVariantAvailable;
  if (!isProductAvailable)
    return (
      <button
        disabled
        className="flex h-[36px] w-[36px] items-center justify-center border border-primary bg-primary text-white"
      >
        <BsBasket />
      </button>
    );
  if (isReadyToBuy)
    return (
      <Form method="post" action="/cart">
        <input type="hidden" name="variantID" value={variant.id} />
        <input type="hidden" name="_action" value="add" />
        <input type="hidden" name="redirectTo" value={location.pathname} />
        <button className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-primary ">
          <BsBasket />
        </button>
      </Form>
    );
  return (
    <button
      onClick={() => {
        openModal(product);
      }}
      className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-primary"
    >
      <BsBasket />
    </button>
  );
};
