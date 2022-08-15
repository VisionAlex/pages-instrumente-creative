import { HeartIcon, HomeIcon, UserIcon } from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import React from "react";
import { BsBasket, BsHeart, BsPerson } from "react-icons/bs";
import { Counter } from "./shared/Counter";

export const FOOTER_HEIGHT = 50;

interface Props {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FooterMenu: React.FC<Props> = ({
  setShowCart,
  setShowWishlist,
  setShowAccountModal,
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
      <UserIcon
        strokeWidth={1}
        className="h-6 w-6 cursor-pointer hover:opacity-70"
        onClick={() => setShowAccountModal(true)}
      />
      <Counter count={0} onClick={() => setShowCart(true)}>
        <BsBasket size={18} />
      </Counter>
      <Counter count={0} onClick={() => setShowWishlist(true)}>
        <HeartIcon
          strokeWidth={1}
          className="h-6 w-6 cursor-pointer hover:opacity-70"
        />
      </Counter>
    </nav>
  );
};
