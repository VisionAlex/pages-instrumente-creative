import React from "react";
import type { Products } from "~/routes";

interface Props {
  products: Products;
}

export const ProductsTab: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products.products.edges.map(({ node: product }) => (
        <div key={product.id}>
          <h5>{product.title}</h5>
          <img
            src={product.imageMedium.edges[0].node.url}
            alt={product.imageMedium.edges[0].node.altText ?? ""}
            width={360}
            height={240}
          />
        </div>
      ))}
    </>
  );
};
