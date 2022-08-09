import React from "react";

interface Props {
  text: string;
}

export const Button: React.FC<Props> = ({ text }) => {
  return (
    <button className="w-auto cursor-pointer select-none border border-primary bg-lightGrey py-[15px] px-[29px] text-center align-middle font-bold text-primary transition duration-400 hover:bg-primary hover:text-white ">
      {text}
    </button>
  );
};
