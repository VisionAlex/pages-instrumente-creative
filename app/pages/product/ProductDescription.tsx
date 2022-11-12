import React from "react";
import type { HandleProduct } from "~/types";

interface Props {
  product: HandleProduct;
}

export const ProductDescription: React.FC<Props> = ({ product }) => {
  return (
    <div className="mx-5 flex flex-col items-center justify-center">
      <h3 className="my-4 border-b-2 border-primary text-xl">Detalii</h3>
      <div
        className="description text-subtitle"
        dangerouslySetInnerHTML={{
          __html: product.descriptionHtml as string,
        }}
      />
    </div>
  );
};
