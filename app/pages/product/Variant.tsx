import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  title: string;
  isSelected: boolean;
  onClick: React.MouseEventHandler;
}

export const Variant: React.FC<Props> = ({ title, isSelected, onClick }) => {
  console.log(isSelected);
  return (
    <li
      className={classNames(
        "flex h-[44px] cursor-pointer items-center justify-center border border-line  px-2 text-primary hover:border-primary",
        isSelected ? "ring-1 ring-primary" : undefined
      )}
      onClick={onClick}
    >
      {title}
    </li>
  );
};
