import React from "react";
import { BsBasket, BsHeart, BsPerson, BsSearch } from "react-icons/bs";
import { Counter } from "./shared/Counter";

interface Props {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toolbar: React.FC<Props> = ({
  setShowCart,
  setShowWishlist,
  setShowAccountModal,
}) => {
  return (
    <div className={`order-3 flex items-center  gap-4 text-primary`}>
      <BsSearch className="cursor-pointer hover:opacity-70" />
      <BsPerson
        fontSize={20}
        className="hidden cursor-pointer hover:opacity-70 lg:block"
        onClick={() => setShowAccountModal(true)}
      />
      <Counter count={0} hideOnLg onClick={() => setShowCart(true)}>
        <BsBasket />
      </Counter>
      <Counter count={0} hideOnLg onClick={() => setShowWishlist(true)}>
        <BsHeart />
      </Counter>
    </div>
  );
};
