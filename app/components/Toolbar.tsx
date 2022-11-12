import React from "react";
import { HeartIcon, SearchIcon } from "@heroicons/react/outline";
import { BsBasket } from "react-icons/bs";
import type { GetUserQuery } from "~/generated/graphql";
import { AccountIcon } from "./AccountIcon";
import { Counter } from "./shared/Counter";

interface Props {
  user: GetUserQuery | null;
  wishlistSize: number;
  cartSize: number;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toolbar: React.FC<Props> = ({
  setShowCart,
  setShowWishlist,
  setShowAccountModal,
  user,
  cartSize,
  wishlistSize,
}) => {
  const firstName = user?.customer?.firstName;

  return (
    <div className="order-3 flex items-center  gap-4 text-primary antialiased">
      {firstName ? (
        <div className="hidden lg:block">Hello, {firstName}</div>
      ) : null}
      <AccountIcon
        openModal={() => setShowAccountModal(true)}
        user={user}
        className="hidden lg:block"
      />
      <Counter count={cartSize} hideOnLg onClick={() => setShowCart(true)}>
        <BsBasket />
      </Counter>
      <Counter
        count={wishlistSize}
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
