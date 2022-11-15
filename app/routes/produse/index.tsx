import type { MetaFunction } from "@remix-run/cloudflare";
import { Link, useOutletContext } from "@remix-run/react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { AddToCart } from "~/components/AddToCart";
import { AddToWishlist } from "~/components/AddToWishlist";
import { PageHeader } from "~/components/shared/PageHeader";
import { Price } from "~/components/shared/Price";
import { SaleTag } from "~/components/shared/SaleTag";
import { config } from "~/config";
import type { Products } from "~/types";

export const meta: MetaFunction = () => {
  return {
    title: "Produse - Instrumente Creative",
  };
};

type OutletContextType = {
  wishlist: string[];
  products: Products;
};

const AllProducts: React.FC = () => {
  const { wishlist, products } = useOutletContext<OutletContextType>();
  if (!products) return null;
  return (
    <div>
      <PageHeader className="max-w-screen-2xl" />
      <div>
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:grid-cols-4 xl:px-20">
          {products.map(({ node: product }) => {
            const isFavorite = wishlist.some((item) => item === product.id);
            return (
              <div
                key={product.id}
                className="max-2xl grid grid-cols-1 overflow-hidden border border-secondaryBackground "
              >
                <Link
                  to={`${config.pages.produse.path}/${product.handle}`}
                  className=" relative cursor-pointer"
                >
                  <div className="aspect-w-4 aspect-h-3 object-contain object-center">
                    <img
                      loading="lazy"
                      src={product.imageMedium.edges[0].node.url}
                      alt={product.imageMedium.edges[0].node.altText || ""}
                    />
                  </div>
                  {!product.availableForSale && (
                    <div className="absolute top-8 left-8 bg-tag py-0.5 px-1 text-sm text-white">
                      Stoc epuizat
                    </div>
                  )}
                  {product.availableForSale &&
                  product.productType !== "Gift Cards" ? (
                    <SaleTag
                      amount={product.priceRange.minVariantPrice.amount}
                      compareAtPrice={
                        product.compareAtPriceRange.minVariantPrice.amount
                      }
                      variant="secondary"
                    />
                  ) : null}
                </Link>
                <div className=" z-10 border-t border-secondaryBackground py-8 px-8 text-subtitle xs:my-8 xs:border-t-0 xs:border-l xs:py-0">
                  <Link
                    className="hover:text-primary"
                    to={`${config.pages.produse.path}/${product.handle}`}
                  >
                    {product.title}
                  </Link>
                  <Price
                    price={product.priceRange.minVariantPrice.amount}
                    compareAtPrice={
                      product.compareAtPriceRange.minVariantPrice.amount
                    }
                    isGiftCard={product.productType === "Gift Cards"}
                  />
                  <div className="mt-5 flex items-center gap-1.5 text-primary">
                    <AddToCart product={product} />
                    <div className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-primary">
                      <BsSearch />
                    </div>
                    <AddToWishlist
                      productID={product.id}
                      isFavorite={isFavorite}
                    />
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
