import { Link } from "@remix-run/react";
import React from "react";
import type { ButtonProps } from "./ButtonBase";
import { ButtonBase } from "./ButtonBase";

interface Props extends ButtonProps {
  to: string;
}

export const LinkButton: React.FC<Props> = ({ to, ...buttonProps }) => {
  return (
    <Link to={to} prefetch="intent">
      <ButtonBase {...buttonProps} />
    </Link>
  );
};
