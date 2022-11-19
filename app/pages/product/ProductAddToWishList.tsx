import { HeartIcon } from "@heroicons/react/outline";
import { Form, useLocation } from "@remix-run/react";
import React from "react";
import { classNames } from "~/shared/utils/classNames";
import type { DetailedProduct, Product } from "~/types";

interface Props {
  wishlist: string[];
  product: DetailedProduct | Product;
}
export const ProductAddToWishList: React.FC<Props> = ({
  product,
  wishlist,
}) => {
  const isFavorite = wishlist.some((item) => item === product?.id);
  const location = useLocation();

  return (
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
  );
};
