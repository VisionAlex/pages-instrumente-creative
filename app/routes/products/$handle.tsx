import type { LoaderArgs, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { sdk } from "graphqlWrapper";
import { useState } from "react";
import { ImageGallery } from "~/components/ImageGallery";
import { Breadcrumb } from "~/components/shared/Breadcrumb/Breadcrumb";
import { Price } from "~/components/shared/Price";
import { Availability } from "~/pages/product/Availability";
import { BuyNow } from "~/pages/product/BuyNow";
import { GiftPrice } from "~/pages/product/GiftPrice";
import { ProductAddToCart } from "~/pages/product/ProductAddToCart";
import { ProductAddToWishList } from "~/pages/product/ProductAddToWishList";
import { ProductDescription } from "~/pages/product/ProductDescription";
import { Quantity } from "~/pages/product/Quantity";
import { Variants } from "~/pages/product/Variants";
import { useSSRLayoutEffect } from "~/shared/hooks/useSSRLayoutEffect";
import { preloadImage } from "~/shared/utils/preloadImage";
import type { HandleProduct } from "~/types";

type ProductLoaderData = {
  product: HandleProduct;
};

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderArgs) => {
  const productData = await sdk.getProductByHandle(
    { handle: params.handle! },
    { request }
  );

  if (!productData || !productData.product) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const loaderData: ProductLoaderData = {
    product: productData.product,
  };
  return json(loaderData);
};

const SingleProduct: React.FC = () => {
  const { product } = useLoaderData<ProductLoaderData>();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const variants = product.variants.edges.map(({ node: variant }) => variant);

  const images = product.imagesMedium.edges.map(({ node: image }) => image);
  const price = variants[selectedVariant].price.amount;
  const compareAtPrice = variants[selectedVariant].compareAtPrice?.amount;
  const isGiftCard = product.productType === "Gift Cards";

  const hasMultipleVariants = variants.length > 1;

  useSSRLayoutEffect(() => {
    Promise.all(images.map((image) => preloadImage(image.url)));
  }, [images]);

  if (!product) return <div>Produsul nu a fost gasit.</div>;

  return (
    <div className="mx-auto px-5 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <div className="rounded-md lg:col-span-4 lg:row-end-1">
          <ImageGallery images={images} />
        </div>
        <div className="mx-auto mt-8 max-w-2xl lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-8 lg:max-w-none">
          <div className="flex flex-col ">
            <Breadcrumb name={product.title} className="self-center" />
            <div className="w-full border-b border-secondaryBackground py-4">
              <h1 className="text-center text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-start">
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
            <div className="mt-4 flex w-full self-start">
              <Quantity quantity={quantity} setQuantity={setQuantity} />
              <ProductAddToCart
                product={product}
                quantity={quantity}
                variant={selectedVariant}
              />
              <ProductAddToWishList product={product} />
            </div>
            {product.availableForSale && (
              <div className="mt-4 w-full">
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
    </div>
  );
};

export default SingleProduct;
