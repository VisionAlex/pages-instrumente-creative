import React from "react";

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
}

export const FormSelect: React.FC<Props> = ({
  children,
  name,
  label,
  defaultValue,
}) => {
  return (
    <div className="block">
      <label htmlFor={name} className="block text-subtitle">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="mb-5 inline-block h-12 w-full border border-secondaryBackground py-1.5 px-2 text-input outline-none focus:border-primary"
        defaultValue={defaultValue}
      >
        {children}
      </select>
    </div>
  );
};
