import React from "react";
import { BsBasket, BsHeart, BsPerson, BsSearch } from "react-icons/bs";
import { Counter } from "./shared/Counter";
import { MenuIcon } from "./shared/icons";

export const Toolbar: React.FC = () => {
  return (
    <div className={`order-3 flex items-center  gap-4 text-primary`}>
      <BsSearch className="cursor-pointer hover:opacity-70" />
      <BsPerson
        fontSize={20}
        className="hidden cursor-pointer hover:opacity-70 lg:block"
      />
      <Counter count={0} hideOnLg>
        <BsBasket />
      </Counter>
      <Counter count={0} hideOnLg>
        <BsHeart />
      </Counter>
    </div>
  );
};
