import { Form, useLocation } from "@remix-run/react";
import React from "react";
import { BsBasket } from "react-icons/bs";
import { classNames } from "~/shared/utils/classNames";
import type { Product } from "~/types";

interface Props {
  product: Product;
  openModal: (product: Product) => void;
  asText?: boolean;
}

export const AddToCart: React.FC<Props> = ({ product, openModal, asText }) => {
  const location = useLocation();
  const isProductAvailable = product.availableForSale;
  const hasOnlyOneVariant = product.variants.edges.length === 1;
  const variant = product.variants.edges[0].node;
  const isVariantAvailable = variant.availableForSale;
  const isReadyToBuy =
    isProductAvailable && hasOnlyOneVariant && isVariantAvailable;

  if (!isProductAvailable) return <BuyButton disabled asText={asText} />;
  if (isReadyToBuy)
    return (
      <Form method="post" action="/cart">
        <input type="hidden" name="variantID" value={variant.id} />
        <input type="hidden" name="_action" value="add" />
        <input type="hidden" name="redirectTo" value={location.pathname} />
        <BuyButton asText={asText} />
      </Form>
    );
  return (
    <BuyButton
      asText={asText}
      onClick={() => {
        openModal(product);
      }}
    />
  );
};

interface BuyButtonProps {
  disabled?: boolean;
  asText?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BuyButton: React.FC<BuyButtonProps> = ({ disabled, asText, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "flex h-[44px]  items-center justify-center border border-primary  transition-colors duration-500",
        disabled
          ? "bg-primary text-white"
          : "cursor-pointer bg-white text-primary hover:bg-primary hover:text-white",
        asText ? "px-4" : "w-[44px]"
      )}
    >
      {asText ? "Adaugă în coș" : <BsBasket />}
    </button>
  );
};
