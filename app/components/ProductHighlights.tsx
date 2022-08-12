import React from "react";
import { BsBasket } from "react-icons/bs";
import type { Products } from "~/routes";

interface Props {
  products: Products;
}

export const ProductsHighlights: React.FC<Props> = ({ products }) => {
  return (
    <div className="mx-auto max-w-3xl py-4 px-5">
      <h3 className="mb-7 text-center text-3xl leading-tight text-primary">
        Dezvoltă competențele copilului tău
      </h3>
      <div className="grid grid-cols-2 justify-items-center gap-3 md:grid-cols-3">
        {products.map(({ node: product }, index) => {
          let additionalClasses = "";
          if (products.length % 2 !== 0 && index === products.length - 1) {
            additionalClasses = "col-span-2 md:col-span-1 mx-auto";
          }
          return (
            <div key={product.id} className={`${additionalClasses}`}>
              <img
                className="cursor-pointer transition duration-400 hover:scale-110"
                loading="lazy"
                src={product.imageSmall.edges[0].node.url}
                alt={product.imageSmall.edges[0].node.altText ?? ""}
                width={215}
                height={143}
              />
              <div className="flex items-start justify-between  pt-2">
                <a
                  className="max-w-fit text-subtitle hover:text-primary"
                  href={`/produse/${product.handle}`}
                >
                  {product.title}
                </a>
                <a className="ml-4 hover:opacity-70" href="/add-to-basket">
                  <BsBasket fontSize={18} />
                </a>
              </div>
              <p className="text-primary">
                {product.productType === "Gift Cards" ? "de la " : undefined}
                {Number(product.priceRange.minVariantPrice.amount)} lei
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
