import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment, useState } from "react";
import { GiftPrice } from "~/pages/product/GiftPrice";
import { ProductAddToCart } from "~/pages/product/ProductAddToCart";
import { ProductAddToWishList } from "~/pages/product/ProductAddToWishList";
import { Quantity } from "~/pages/product/Quantity";
import { Variants } from "~/pages/product/Variants";
import type { Product } from "~/types";
import { ImageGallery } from "../ImageGallery";
import { Price } from "../shared/Price";

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  wishlist: string[];
}

export const ProductModal: React.FC<Props> = ({
  open,
  onClose,
  product,
  wishlist,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  if (!product) return null;

  const images = product.imageMedium.edges.map((edge) => edge.node);
  const variants = product.variants.edges.map(({ node: variant }) => variant);

  const price = variants[selectedVariant].price.amount;
  const compareAtPrice = variants[selectedVariant].compareAtPrice?.amount;
  const isGiftCard = product.productType === "Gift Cards";

  const hasMultipleVariants = variants.length > 1;

  // TODO: Add product description
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-400"
          enterFrom="opacity-0 "
          enterTo="opacity-100"
          leave="ease-in-out duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary bg-opacity-25"></div>
        </Transition.Child>
        <div className="fixed inset-0">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-400"
            enterFrom="scale-125 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transform transition ease-in-out duration-400"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-125 opacity-0"
          >
            <Dialog.Panel className="absolute inset-0 m-auto max-h-fit w-[95vw] max-w-[490px] bg-white px-5 py-8 md:px-12 md:py-14">
              <div className="absolute right-4 top-4">
                <span className="sr-only">Close</span>
                <button className="cursor-pointer text-primary outline-none hover:text-subtitle">
                  <XIcon className="h-4 w-4" onClick={onClose} />
                </button>
              </div>
              <div>
                <ImageGallery images={images} />
                <div>
                  <h3 className="text-2xl">{product.title}</h3>
                </div>
              </div>
              {isGiftCard ? (
                <GiftPrice price={price} />
              ) : (
                <Price price={price} compareAtPrice={compareAtPrice} />
              )}
              {hasMultipleVariants && ( // TODO Handle variants not available
                <Variants
                  variants={variants}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                />
              )}
              <div className="mt-4 flex w-full max-w-3xl self-start">
                <Quantity quantity={quantity} setQuantity={setQuantity} />
                <ProductAddToCart
                  product={product}
                  quantity={quantity}
                  variant={selectedVariant}
                  onAddToCart={onClose}
                />
                <ProductAddToWishList product={product} wishlist={wishlist} />
              </div>
              <div className="mt-5">
                <p className="text-subtitle">
                  {product.description.split(".")[0]}
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
