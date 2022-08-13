import React from "react";
import { classNames } from "~/shared/utils/classNames";

export interface ButtonProps {
  text: string;
  full?: boolean;
  variant?: "default" | "dark" | "light";
  responsive?: boolean;
  className?: string;
}

export const ButtonBase: React.FC<ButtonProps> = ({
  text,
  full,
  variant = "default",
  responsive,
  className = "",
}) => {
  return (
    <span
      className={classNames(
        full ? "w-full" : "",
        variant === "default"
          ? "border border-primary bg-lightGrey text-primary hover:bg-primary hover:text-white"
          : "",
        variant === "dark"
          ? "relative z-0 flex items-center justify-center overflow-visible border border-primary bg-primary text-white transition-colors duration-150 before:absolute before:inset-0 before:-z-10 before:w-0 before:origin-[0%_50%] before:transition-all before:duration-400 hover:bg-transparent hover:text-primary hover:before:w-full hover:before:bg-white "
          : "",
        variant === "light"
          ? "relative z-0 flex items-center justify-center overflow-visible border border-primary bg-white bg-left-top px-8 py-4 text-primary before:absolute before:inset-0 before:-z-10 before:w-0 before:origin-[0%_50%] before:rounded-none before:bg-primary before:transition-all before:duration-400 hover:text-white hover:before:w-full"
          : "",
        responsive ? "py-2 px-4 lg:py-4 lg:px-8" : "py-4 px-8",
        "transition-colors",
        className
      )}
    >
      {text}
    </span>
  );
};
