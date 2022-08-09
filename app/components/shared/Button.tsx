import React from "react";

interface Props {
  text: string;
}

export const Button: React.FC<Props> = ({ text }) => {
  return (
    <button className="cursor-pointer select-none border border-primary bg-lightGrey py-2 px-4 text-center align-middle text-primary transition  duration-400 hover:bg-primary hover:text-white lg:py-4 lg:px-8 ">
      {text}
    </button>
  );
};
