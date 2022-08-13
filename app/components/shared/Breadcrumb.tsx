import React from "react";
import { classNames } from "~/shared/utils/classNames";
import { Link } from "./Link";

interface Props {
  name: string | undefined;
  className?: string;
}

export const Breadcrumb: React.FC<Props> = ({ name, className = "" }) => {
  if (!name) return null;

  return (
    <div className={classNames("flex gap-1.5", className)}>
      <Link to="/">Acasa </Link>
      <span>/</span>
      <span>{name}</span>
    </div>
  );
};
