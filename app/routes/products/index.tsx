import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { BsBasket, BsHeart, BsSearch } from "react-icons/bs";
import { PageHeader } from "~/components/shared/PageHeader";
import { getProducts } from "~/providers/products/products";
import type { Products } from "..";

export type ProductsLoaderData = {
  products: Products;
};

export const meta: MetaFunction = () => {
  return {
    title: "Produse - Instrumente Creative",
  };
};

export const loader = async () => {
  const products = await getProducts(20);
  const loaderData: ProductsLoaderData = {
    products: products.products.edges,
  };
  return json(loaderData);
};
const AllProducts: React.FC = () => {
  const { products } = useLoaderData<ProductsLoaderData>();

  return (
    <div>
      <PageHeader />
      <div>
        <div className="mx-5 grid grid-cols-1 gap-6">
          {products.map(({ node: product }) => {
            return (
              <div
                key={product.id}
                className="grid grid-cols-1 overflow-hidden border border-secondaryBackground xs:grid-cols-2"
              >
                <div className="relative flex cursor-pointer items-center">
                  <img
                    loading="lazy"
                    src={product.imageSmall.edges[0].node.url}
                    alt={product.imageSmall.edges[0].node.altText || ""}
                  />
                  {!product.availableForSale && (
                    <div className="absolute top-8 left-8 bg-tag py-0.5 px-1 text-sm text-white">
                      Stoc epuizat
                    </div>
                  )}
                </div>
                <div className=" z-10 border-t border-secondaryBackground py-8 px-8 text-subtitle xs:my-8 xs:border-t-0 xs:border-l xs:py-0">
                  <div>{product.title}</div>
                  <p className="text-primary">
                    {product.productType === "Gift Cards"
                      ? "de la "
                      : undefined}
                    {Number(product.priceRange.minVariantPrice.amount)} lei
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-primary">
                    <div className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-primary">
                      <BsBasket />
                    </div>
                    <div className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-primary">
                      <BsSearch />
                    </div>
                    <div className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-primary">
                      <BsHeart />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
