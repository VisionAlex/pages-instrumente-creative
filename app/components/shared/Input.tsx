import React from "react";

interface Props {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="mb-5 h-12 w-full border border-secondaryBackground py-1.5 px-5 text-input outline-none"
    />
  );
};
