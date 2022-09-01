import { HeartIcon, HomeIcon } from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import React from "react";
import { BsBasket } from "react-icons/bs";
import type { GetUserQuery } from "~/generated/graphql";
import { AccountIcon } from "./AccountIcon";
import { Counter } from "./shared/Counter";

export const FOOTER_HEIGHT = 50;

interface Props {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: GetUserQuery | null;
  wishlistSize: number;
}

export const FooterMenu: React.FC<Props> = ({
  setShowCart,
  setShowWishlist,
  setShowAccountModal,
  user,
  wishlistSize,
}) => {
  return (
    <nav
      className="fixed bottom-0 z-50 flex w-screen items-center justify-evenly bg-white text-primary antialiased shadow-2xl lg:hidden"
      style={{ height: FOOTER_HEIGHT }}
    >
      <Link to="/" prefetch="intent">
        <HomeIcon
          strokeWidth={1}
          className="h-6 w-6 cursor-pointer hover:opacity-70"
        />
      </Link>
      <AccountIcon
        user={user}
        openModal={() => setShowAccountModal(true)}
        className="h-6 w-6"
      />
      <Counter count={0} onClick={() => setShowCart(true)}>
        <BsBasket size={18} />
      </Counter>
      <Counter count={wishlistSize} onClick={() => setShowWishlist(true)}>
        <HeartIcon
          strokeWidth={1}
          className="h-6 w-6 cursor-pointer hover:opacity-70"
        />
      </Counter>
    </nav>
  );
};
