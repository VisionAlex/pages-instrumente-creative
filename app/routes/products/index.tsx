import { HeartIcon } from "@heroicons/react/outline";
import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Form,
  Link,
  useLoaderData,
  useLocation,
  useOutletContext,
} from "@remix-run/react";
import React from "react";
import { BsBasket, BsSearch } from "react-icons/bs";
import { PageHeader } from "~/components/shared/PageHeader";
import type { WishlistItem } from "~/providers/products/products";
import { getProducts } from "~/providers/products/products";
import { classNames } from "~/shared/utils/classNames";
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
  const { wishlist } = useOutletContext<{ wishlist: WishlistItem[] }>();
  const location = useLocation();
  return (
    <div>
      <PageHeader />
      <div>
        <div className="mx-5 grid grid-cols-1 gap-6">
          {products.map(({ node: product }) => {
            const isFavorite = wishlist.some((item) => item.id === product.id);
            return (
              <div
                key={product.id}
                className="grid grid-cols-1 overflow-hidden border border-secondaryBackground xs:grid-cols-2"
              >
                <Link
                  to={`/products/${product.handle}`}
                  className="relative flex cursor-pointer items-center"
                >
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
                </Link>
                <div className=" z-10 border-t border-secondaryBackground py-8 px-8 text-subtitle xs:my-8 xs:border-t-0 xs:border-l xs:py-0">
                  <Link
                    className="hover:text-primary"
                    to={`/products/${product.handle}`}
                  >
                    {product.title}
                  </Link>
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
                    <Form method="post" action="/wishlist">
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />
                      <input type="hidden" name="_action" value="add" />
                      <input
                        type="hidden"
                        name="redirectTo"
                        value={location.pathname}
                      />
                      <button className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center border border-primary">
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
