import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ImageGallery } from "~/components/ImageGallery";
import { Breadcrumb } from "~/components/shared/Breadcrumb/Breadcrumb";
import { FadeIn } from "~/components/shared/FadeIn";
import {
  getShopifyImageUrl,
  preloadImage,
} from "~/components/shared/image/utils";
import { Price } from "~/components/shared/Price";
import { createSdk } from "~/graphqlWrapper";
import { Availability } from "~/pages/product/Availability";
import { BuyNow } from "~/pages/product/BuyNow";
import { GiftPrice } from "~/pages/product/GiftPrice";
import { ProductAddToCart } from "~/pages/product/ProductAddToCart";
import { ProductAddToWishList } from "~/pages/product/ProductAddToWishList";
import { ProductDescription } from "~/pages/product/ProductDescription";
import { Quantity } from "~/pages/product/Quantity";
import { Variants } from "~/pages/product/Variants";
import { getWishlist } from "~/providers/products/products";
import { useSSRLayoutEffect } from "~/shared/hooks/useSSRLayoutEffect";
import type { DetailedProduct } from "~/types";

type ProductLoaderData = {
  product: DetailedProduct;
  wishlist: string[];
};

export const loader: LoaderFunction = async ({ params, request, context }) => {
  const sdk = createSdk(context);
  const productData = await sdk.getProductByHandle(
    { handle: params.handle! },
    { request }
  );

  if (!productData || !productData.product) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const wishlist = await getWishlist(request);

  const loaderData: ProductLoaderData = {
    product: productData.product,
    wishlist,
  };
  return json(loaderData);
};

const IMG_SIZE = 1336;

const SingleProduct: React.FC = () => {
  const { product, wishlist } = useLoaderData<ProductLoaderData>();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const variants = product.variants.edges.map(({ node: variant }) => variant);

  const images = product.images.edges.map(({ node: image }) => image);
  const price = variants[selectedVariant].price.amount;
  const compareAtPrice = variants[selectedVariant].compareAtPrice?.amount;
  const isGiftCard = product.productType === "Gift Cards";
  const hasMultipleVariants = variants.length > 1;

  useSSRLayoutEffect(() => {
    Promise.all(
      images.map((image) =>
        preloadImage(getShopifyImageUrl(image.url, IMG_SIZE) as string)
      )
    );
  }, [images]);

  if (!product) return <div>Produsul nu a fost gasit.</div>;

  return (
    <FadeIn className="mx-auto px-5 lg:max-w-7xl lg:px-8">
      <div className="mt-8 lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-8">
        <div className="relative rounded-md lg:col-span-4">
          <ImageGallery images={images} imgSize={IMG_SIZE} />
        </div>
        <div className="mt-8 lg:col-span-3 lg:mt-0">
          <div className="flex flex-col ">
            <Breadcrumb name={product.title} className="self-center" />
            <div className="w-full border-b border-secondaryBackground py-4">
              <h1 className="text-center text-2xl tracking-tight text-primary sm:text-3xl lg:text-start">
                {product.title}
              </h1>
            </div>
            <div className="mt-4 self-start">
              {isGiftCard ? (
                <GiftPrice price={price} />
              ) : (
                <Price price={price} compareAtPrice={compareAtPrice} />
              )}
            </div>
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
              />
              <ProductAddToWishList product={product} wishlist={wishlist} />
            </div>
            {product.availableForSale && (
              <div className="mt-4 w-full max-w-3xl">
                <BuyNow
                  productId={variants[selectedVariant].id}
                  quantity={quantity}
                />
              </div>
            )}
            <div className="mt-4">
              <Availability
                inStock={variants[selectedVariant].availableForSale}
              />
            </div>
          </div>
        </div>
      </div>
      <ProductDescription product={product} />
    </FadeIn>
  );
};

export default SingleProduct;
