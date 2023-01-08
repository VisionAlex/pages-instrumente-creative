import { Link } from "@remix-run/react";
import React from "react";
import { config } from "~/config";
import type { Product } from "~/types";
import { AddToCart } from "./AddToCart";
import { ProductModal } from "./ProductModal";
import { useProductModal } from "./ProductModal/useProductModal";
import { SImage } from "./shared/image/SImage";
import { Price } from "./shared/Price";
import { SaleTag } from "./shared/SaleTag";
interface Props {
  products: Product[];
  wishlist: string[];
  showNotification: () => void;
}

export const ProductsHighlights: React.FC<Props> = ({
  products,
  wishlist,
  showNotification,
}) => {
  const { product, isOpen, closeModal, openModal } = useProductModal(products);
  if (!products) return null;
  return (
    <>
      <ProductModal
        open={isOpen}
        product={product}
        wishlist={wishlist}
        onClose={closeModal}
      />
      <div className="mx-auto mt-10 max-w-screen-2xl py-4 px-5 lg:px-8 xl:px-20">
        <h3 className="mb-7 text-center text-3xl leading-tight text-primary">
          Dezvoltă competențele copilului tău
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:justify-items-center">
          {products.map((product) => {
            const price = product.priceRange.minVariantPrice.amount;
            const compareAtPrice =
              product.compareAtPriceRange.minVariantPrice.amount;
            const image = product.images.edges[0].node;
            return (
              <div key={product.id} className="w-full">
                <Link
                  className="relative"
                  to={`${config.pages.produse.path}/${product.handle}`}
                  prefetch="intent"
                >
                  <div className="aspect-w-3 aspect-h-2 overflow-hidden">
                    <SImage
                      image={image}
                      width={720}
                      className="cursor-pointer"
                    />
                  </div>
                  <SaleTag amount={price} compareAtPrice={compareAtPrice} />
                </Link>
                <div className="flex items-start justify-between pt-2">
                  <Link
                    className="max-w-fit text-subtitle hover:text-primary"
                    to={`/produse/${product.handle}`}
                    prefetch="intent"
                  >
                    {product.title}
                  </Link>
                  <AddToCart
                    product={product}
                    openModal={openModal}
                    showNotification={showNotification}
                  />
                </div>
                <Price
                  price={price}
                  compareAtPrice={compareAtPrice}
                  isGiftCard={product.productType === "Gift Cards"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
