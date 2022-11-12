import React from "react";
import { Link } from "../Link";
import { Divider } from "./Divider";

interface Props {
  name: string | undefined;
  className?: string;
}

export const Breadcrumb: React.FC<Props> = ({ name, className = "" }) => {
  if (!name) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center">
        <li>
          <Link to="/">Acasă </Link>
        </li>
        <Divider />
        <li className="select-none text-subtitle">
          <span>{name}</span>
        </li>
      </ol>
    </nav>
  );
};
