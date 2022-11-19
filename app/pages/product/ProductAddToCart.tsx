import { Form, useLocation } from "@remix-run/react";
import React from "react";
import { classNames } from "~/shared/utils/classNames";
import type { DetailedProduct, Product } from "~/types";

interface Props {
  product: DetailedProduct | Product;
  variant: number;
  quantity: number;
  onAddToCart?: () => void;
}

export const ProductAddToCart: React.FC<Props> = ({
  product,
  variant,
  quantity,
  onAddToCart,
}) => {
  const location = useLocation();

  return (
    <Form method="post" action="/cart" className="grow">
      <input
        type="hidden"
        name="variantID"
        value={product.variants.edges[variant].node.id}
      />
      <input type="hidden" name="_action" value="add" />
      <input type="hidden" name="quantity" value={quantity} />
      <input type="hidden" name="redirectTo" value={location.pathname} />
      <button
        disabled={!product.availableForSale}
        onClick={onAddToCart ? () => onAddToCart() : undefined}
        className={classNames(
          "h-12 w-full  bg-primary px-4 py-2 text-sm uppercase tracking-widest text-white transition-all ",
          !product.availableForSale
            ? "bg-subtitle"
            : " border border-primary hover:bg-white hover:text-primary"
        )}
      >
        {product.availableForSale ? "Adaugă în coș" : "Stoc epuizat"}
      </button>
    </Form>
  );
};
