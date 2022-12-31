import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  name: string;
  label: string;
  defaultValue: boolean | undefined;
  className?: string;
}

export const FormCheckbox: React.FC<Props> = ({
  name,
  label,
  defaultValue,
  className,
}) => {
  return (
    <div className={classNames("grow", defaultValue ? "hidden" : "")}>
      <div className="mb-5 flex items-center gap-2">
        <input
          name={name}
          id={name}
          type="checkbox"
          className={classNames(
            "h-5 w-5 border-line  focus:ring-primary",
            className
          )}
          defaultChecked={defaultValue}
        />
        <label htmlFor={name} className=" text-subtitle">
          {label}
        </label>
      </div>
    </div>
  );
};
