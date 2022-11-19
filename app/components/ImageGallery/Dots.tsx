import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface DotProps {
  isSelected?: boolean;
}

const Dot: React.FC<DotProps> = ({ isSelected }) => {
  return (
    <span
      className={classNames(
        "mx-1 h-[5px] w-[5px] rounded-full transition-all duration-500",

        isSelected ? "bg-subtitle" : "bg-secondaryBackground"
      )}
    />
  );
};

interface DotsProps {
  size: number;
  selected: number;
}
export const Dots: React.FC<DotsProps> = ({ size, selected }) => {
  const list = Array.from({ length: size }, (_, i) => i);
  return (
    <div className="absolute top-2 left-2 z-20 flex">
      {list.map((_, i) => (
        <Dot key={i} isSelected={i === selected} />
      ))}
    </div>
  );
};
