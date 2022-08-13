import React from "react";

interface Props {
  count?: number;
  hideOnLg?: boolean;
  onClick?: () => void;
}

export const Counter: React.FC<Props> = ({
  count = 0,
  children,
  hideOnLg,
  onClick,
}) => {
  return (
    <div
      className={`relative mr-[11px] cursor-pointer hover:opacity-70 ${
        hideOnLg ? "hidden lg:inline-block" : ""
      }`}
      onClick={onClick}
    >
      <div className=" absolute  right-[-11px] top-[-4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full  bg-primary px-0 py-[3px] text-center text-tiny  text-white">
        {count}
      </div>
      {children}
    </div>
  );
};
