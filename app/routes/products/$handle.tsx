import type { LoaderArgs, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Form,
  useLoaderData,
  useLocation,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import { sdk } from "graphqlWrapper";
import React, { useState } from "react";
import { Breadcrumb } from "~/components/shared/Breadcrumb";
import type { GetProductByHandleQuery } from "~/generated/graphql";
import { PlusSmIcon, MinusSmIcon, HeartIcon } from "@heroicons/react/outline";
import { classNames } from "~/shared/utils/classNames";
import { Price } from "~/components/shared/Price";
import { SaleTag } from "~/components/shared/SaleTag";
import { Spinner } from "~/components/shared/Spinner";

type ProductLoaderData = {
  product: GetProductByHandleQuery["product"];
};

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderArgs) => {
  const productData = await sdk.getProductByHandle(
    { handle: params.handle! },
    { request }
  );

  if (!productData) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const loaderData: ProductLoaderData = {
    product: productData.product!,
  };
  return json(loaderData);
};

const SingleProduct: React.FC = () => {
  const { product } = useLoaderData<ProductLoaderData>();
  const { wishlist } = useOutletContext<{ wishlist: string[] }>();

  const location = useLocation();
  const transition = useTransition();
  const isCheckoutSubmitting =
    transition.submission?.formData.get("formName") === "checkout" &&
    transition.state === "submitting";
  const [selectedVariant] = useState(0);

  const [quantity, setQuantity] = useState<number>(1);

  const isFavorite = wishlist.some((item) => item === product?.id);

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const reduceQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const price = product?.variants.edges[selectedVariant].node.price.amount;
  const compareAtPrice =
    product?.variants.edges[selectedVariant].node.compareAtPrice?.amount;

  if (!product) return <div>Produsul nu a fost gasit.</div>;
  return (
    <div className="mx-5">
      <div className=" flex flex-col items-center justify-center border-b border-background">
        <div className="relative border border-background ">
          <img
            className="object-cover"
            src={product.images.edges[0].node.url}
            alt={product.images.edges[0].node.altText ?? ""}
          />
          <SaleTag
            amount={price}
            compareAtPrice={compareAtPrice}
            variant="secondary"
          />
        </div>
        <Breadcrumb name={product.title} className="text-subtitle" />
        <h1 className="py-4 text-title text-primary">{product.title}</h1>
        <div className="pb-3">
          <Price
            amount={price}
            compareAtPrice={compareAtPrice}
            isGiftCard={product.productType === "Gift Cards"}
          />
        </div>
      </div>
      <div className=" mt-4 flex">
        <div className="mr-3 flex">
          <button
            className="border border-background p-2 hover:bg-primary hover:text-white"
            onClick={reduceQuantity}
          >
            <MinusSmIcon strokeWidth={1.5} className="h-6 w-6" />
          </button>
          <input
            value={quantity}
            type="number"
            step="1"
            min="1"
            className="w-11 border-y text-center align-middle text-subtitle outline-none"
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
          />
          <button className="border border-background p-2 hover:bg-primary hover:text-white">
            <PlusSmIcon
              strokeWidth={1.5}
              className="h-6 w-6"
              onClick={addQuantity}
            />
          </button>
        </div>
        <Form method="post" action="/cart" className="grow">
          <input
            type="hidden"
            name="variantID"
            value={product.variants.edges[selectedVariant].node.id}
          />
          <input type="hidden" name="_action" value="add" />
          <input type="hidden" name="quantity" value={quantity} />
          <input type="hidden" name="redirectTo" value={location.pathname} />
          <button
            disabled={!product.availableForSale}
            className={classNames(
              "h-12 w-full bg-primary px-4 py-2 text-sm uppercase tracking-widest text-white transition-all ",
              !product.availableForSale
                ? "bg-subtitle"
                : "hover:border hover:border-primary hover:bg-white hover:text-primary"
            )}
          >
            {product.availableForSale ? "Adaugă în coș" : "Stoc epuizat"}
          </button>
        </Form>

        <Form
          method="post"
          action="/wishlist"
          className="ml-3 flex cursor-pointer select-none items-center justify-center border border-background px-2 transition-colors duration-300 hover:bg-primary hover:text-white"
        >
          <input type="hidden" name="productID" value={product.id} />
          <input type="hidden" name="_action" value="add" />
          <input type="hidden" name="redirectTo" value={location.pathname} />
          <button>
            <HeartIcon
              strokeWidth={1}
              className={classNames(
                "h-5 w-5 fill-primary transition-all duration-300 ease-in-out"
              )}
              fillOpacity={isFavorite ? 1 : 0}
            />
          </button>
        </Form>
      </div>
      <div className="mt-4">
        {product.availableForSale ? (
          <Form method="post" action="/checkout">
            <input type="hidden" name="redirectTo" value={location.pathname} />
            <input
              type="hidden"
              name="variantId"
              value={product.variants.edges[selectedVariant].node.id}
            />
            <input type="hidden" name="formName" value="checkout" />
            <button
              disabled={isCheckoutSubmitting}
              className="flex h-[46px] w-full items-center justify-center border border-primary bg-primary py-3 text-sm uppercase tracking-widest text-white transition-all duration-300 enabled:hover:bg-white enabled:hover:text-primary disabled:pointer-events-none "
            >
              Cumpără acum{" "}
              {isCheckoutSubmitting && <Spinner className="ml-2 h-4 w-4" />}
            </button>
          </Form>
        ) : null}
      </div>
      <div className="mt-4">
        Disponibilate:{" "}
        <span
          className={`${
            product.variants.edges[selectedVariant].node.currentlyNotInStock
              ? "text-red-500"
              : "text-primary"
          }`}
        >
          {product.variants.edges[selectedVariant].node.currentlyNotInStock
            ? "Stoc epuizat"
            : "In stoc"}
        </span>
      </div>
      <div className="mx-5">
        <h3 className="py-4 text-center text-lg">Detalii</h3>
        <div
          className="description text-subtitle"
          dangerouslySetInnerHTML={{
            __html: product.descriptionHtml as string,
          }}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
