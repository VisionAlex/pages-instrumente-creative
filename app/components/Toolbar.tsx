import React from "react";
import { BsBasket, BsHeart, BsPerson, BsSearch } from "react-icons/bs";

export const Toolbar: React.FC = () => {
  return (
    <div className="flex items-center gap-3  text-primary">
      <BsSearch className="cursor-pointer" />
      <BsPerson fontSize={20} className="cursor-pointer" />
      <BsBasket />
      <BsHeart />
    </div>
  );
};
