import { HeartIcon } from "@heroicons/react/outline";
import { Form, useLocation } from "@remix-run/react";
import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  productID: string;
  isFavorite: boolean;
}

export const AddToWishlist: React.FC<Props> = ({ productID, isFavorite }) => {
  const location = useLocation();

  return (
    <Form method="post" action="/wishlist">
      <input type="hidden" name="productID" value={productID} />
      <input type="hidden" name="_action" value="add" />
      <input type="hidden" name="redirectTo" value={location.pathname} />
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
  );
};
