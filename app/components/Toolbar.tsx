import React from "react";
import { HeartIcon, SearchIcon } from "@heroicons/react/outline";
import { BsBasket } from "react-icons/bs";
import type { GetUserQuery } from "~/generated/graphql";
import type { WishlistItem } from "~/providers/products/products";
import { AccountIcon } from "./AccountIcon";
import { Counter } from "./shared/Counter";

interface Props {
  user: GetUserQuery | null;
  wishlist: WishlistItem[];
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toolbar: React.FC<Props> = ({
  setShowCart,
  setShowWishlist,
  setShowAccountModal,
  user,
  wishlist,
}) => {
  return (
    <div className="order-3 flex items-center  gap-4 text-primary antialiased">
      <SearchIcon
        strokeWidth={1}
        className="h-5 w-5 cursor-pointer hover:opacity-70"
      />

      <AccountIcon
        openModal={() => setShowAccountModal(true)}
        user={user}
        className="hidden lg:block"
      />
      <Counter count={0} hideOnLg onClick={() => setShowCart(true)}>
        <BsBasket />
      </Counter>
      <Counter
        count={wishlist ? wishlist.length : 0}
        hideOnLg
        onClick={() => setShowWishlist(true)}
      >
        <HeartIcon
          strokeWidth={1}
          className="h-5 w-5 cursor-pointer hover:placeholder-opacity-70"
        />
      </Counter>
    </div>
  );
};
