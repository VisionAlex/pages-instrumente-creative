import React from "react";
import { BsBasket, BsHeart, BsPerson } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { Counter } from "./shared/Counter";

export const FOOTER_HEIGHT = 50;

export const FooterMenu: React.FC = () => {
  return (
    <nav
      className="fixed bottom-0 flex w-screen items-center justify-evenly bg-white text-primary shadow-2xl lg:hidden"
      style={{ height: FOOTER_HEIGHT }}
    >
      <HiOutlineHome
        fontSize={24}
        className="cursor-pointer hover:opacity-70"
      />
      <BsPerson fontSize={24} className="cursor-pointer hover:opacity-70" />
      <Counter count={0}>
        <BsBasket fontSize={18} />
      </Counter>
      <Counter count={0}>
        <BsHeart fontSize={18} />
      </Counter>
    </nav>
  );
};
