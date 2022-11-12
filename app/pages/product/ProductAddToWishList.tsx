import { HeartIcon } from "@heroicons/react/outline";
import { Form, useLocation, useOutletContext } from "@remix-run/react";
import React from "react";
import { classNames } from "~/shared/utils/classNames";
import type { HandleProduct } from "~/types";

interface Props {
  product: HandleProduct;
}
export const ProductAddToWishList: React.FC<Props> = ({ product }) => {
  const { wishlist } = useOutletContext<{ wishlist: string[] }>();
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
