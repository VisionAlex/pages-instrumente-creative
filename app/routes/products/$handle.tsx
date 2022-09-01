import type { LoaderArgs, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Form,
  useLoaderData,
  useLocation,
  useOutletContext,
} from "@remix-run/react";
import { sdk } from "graphqlWrapper";
import React, { useState } from "react";
import { Breadcrumb } from "~/components/shared/Breadcrumb";
import type { GetProductByHandleQuery } from "~/generated/graphql";
import { PlusSmIcon, MinusSmIcon, HeartIcon } from "@heroicons/react/outline";
import { classNames } from "~/shared/utils/classNames";
import type { WishlistItem } from "~/providers/products/products";

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
  const { wishlist } = useOutletContext<{ wishlist: WishlistItem[] }>();

  const location = useLocation();
  const [selectedVariant] = useState(0);

  const [quantity, setQuantity] = useState<number>(1);

  const isFavorite = wishlist.some((item) => item.id === product?.id);

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
        </div>
        <Breadcrumb name={product.title} className="text-subtitle" />
        <h1 className="py-4 text-title text-primary">{product.title}</h1>
        <p className="pb-3">
          {Number(product.variants.edges[selectedVariant].node.priceV2.amount)}{" "}
          lei
        </p>
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

        <button className="grow bg-primary px-4 py-2 text-sm uppercase tracking-widest text-white">
          Adaugă în coș
        </button>

        <Form
          method="post"
          action="/wishlist"
          className="ml-3 flex cursor-pointer select-none items-center justify-center border border-background px-2 transition-colors duration-300 hover:bg-primary hover:text-white"
        >
          <input type="hidden" name="productId" value={product.id} />
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
        <button className="w-full bg-primary py-3 text-sm uppercase tracking-widest text-white">
          Cumpără acum
        </button>
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
