import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  defaultValue,
  className,
}) => {
  return (
    <div className="mb-5 grow">
      <label htmlFor={name} className=" text-subtitle">
        {label}
      </label>
      <input
        name={name}
        id={name}
        className={classNames(
          "inline-block h-12 w-full border border-secondaryBackground py-1.5 px-2 text-input outline-none focus:border-primary",
          className
        )}
        defaultValue={defaultValue ?? undefined}
      />
    </div>
  );
};
