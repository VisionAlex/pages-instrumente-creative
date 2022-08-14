import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={classNames(
        "mb-5 h-12 w-full border border-secondaryBackground py-1.5 px-5 text-input outline-none",
        className
      )}
    />
  );
};
