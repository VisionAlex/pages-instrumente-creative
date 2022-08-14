import React from "react";
import { BsBasket, BsHeart, BsPerson } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { Counter } from "./shared/Counter";
import { Link } from "./shared/Link";

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
      className="fixed bottom-0 z-50 flex w-screen items-center justify-evenly bg-white text-primary shadow-2xl lg:hidden"
      style={{ height: FOOTER_HEIGHT }}
    >
      <Link to="/">
        <HiOutlineHome
          fontSize={24}
          className="cursor-pointer hover:opacity-70"
        />
      </Link>
      <BsPerson
        fontSize={24}
        className="cursor-pointer hover:opacity-70"
        onClick={() => setShowAccountModal(true)}
      />
      <Counter count={0} onClick={() => setShowCart(true)}>
        <BsBasket fontSize={18} />
      </Counter>
      <Counter count={0} onClick={() => setShowWishlist(true)}>
        <BsHeart fontSize={18} />
      </Counter>
    </nav>
  );
};
