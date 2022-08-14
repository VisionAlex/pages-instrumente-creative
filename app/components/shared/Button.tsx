import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light";
  full?: boolean;
  className?: string;
}

export const Button: React.FC<Props> = ({
  variant = "dark",
  full,
  className = "",
  ...buttonProps
}) => {
  return (
    <button
      className={classNames(
        full ? "w-full" : "",
        variant === "dark"
          ? " bg-primary text-white hover:bg-white hover:text-primary"
          : "",
        variant === "light"
          ? "bg-white text-primary hover:bg-primary hover:text-white"
          : "",
        "h-[50px] border border-primary px-4 text-base leading-[50px] tracking-wider antialiased transition-colors duration-300",
        className
      )}
      {...buttonProps}
    ></button>
  );
};
