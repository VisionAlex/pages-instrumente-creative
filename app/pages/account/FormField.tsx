import type { HTMLInputTypeAttribute } from "react";
import React from "react";
import { Input } from "~/components/shared/Input";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  name: string;
  label: string;
  error?: string;
  defaultValue?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

export const FormField: React.FC<Props> = ({
  name,
  label,
  error,
  defaultValue,
  type,
  required,
}) => {
  return (
    <div>
      <label
        className="mb-1 text-base text-subtitle md:text-lg "
        htmlFor={name}
      >
        {label}
      </label>
      <Input
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        type={type}
        required={required}
        aria-errormessage={error ? `${name}-error` : undefined}
        name={name}
        className={classNames(
          "focus:border-primary",
          error ? "border-error" : ""
        )}
      />
      {error && (
        <div
          role="alert"
          id={`${name}-error`}
          className="-mt-4 mb-2 flex text-error"
        >
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
