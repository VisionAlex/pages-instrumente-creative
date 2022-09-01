import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light";
  full?: boolean;
  slim?: boolean;
  className?: string;
}

export const Button: React.FC<Props> = ({
  variant = "dark",
  full,
  slim,
  className = "",
  ...buttonProps
}) => {
  return (
    <button
      className={classNames(
        full ? "w-full" : "",
        slim ? "h-[38px] text-sm" : "h-[50px] text-base",
        variant === "dark"
          ? " bg-primary text-white hover:bg-white hover:text-primary"
          : "",
        variant === "light"
          ? "bg-white text-primary hover:bg-primary hover:text-white"
          : "",
        "flex items-center justify-center border border-primary px-4 tracking-wider antialiased transition-colors duration-300",
        className
      )}
      {...buttonProps}
    ></button>
  );
};
