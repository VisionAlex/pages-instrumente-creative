import React from "react";
import { BsBasket, BsHeart, BsPerson, BsSearch } from "react-icons/bs";
import { Counter } from "./shared/Counter";

export const Toolbar: React.FC = () => {
  return (
    <div className="flex items-center gap-4  text-primary">
      <BsSearch className="cursor-pointer" />
      <BsPerson fontSize={20} />
      <Counter count={1}>
        <BsBasket />
      </Counter>
      <Counter count={2}>
        <BsHeart />
      </Counter>
    </div>
  );
};
