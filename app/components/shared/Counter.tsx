import React from "react";

interface Props {
  count?: number;
}

export const Counter: React.FC<Props> = ({ count = 0, children }) => {
  return (
    <div className="relative cursor-pointer">
      <div className=" absolute  right-[-11px] top-[-4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full  bg-primary px-0 py-[3px] text-center text-tiny  text-white">
        {count}
      </div>
      {children}
    </div>
  );
};
