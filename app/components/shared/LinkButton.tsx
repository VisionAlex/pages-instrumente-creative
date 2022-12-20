import { Link } from "@remix-run/react";
import React from "react";
import type { ButtonProps } from "./ButtonBase";
import { ButtonBase } from "./ButtonBase";

interface Props extends ButtonProps {
  to: string;
  onClick?: () => void;
}

export const LinkButton: React.FC<Props> = ({
  to,
  onClick,
  ...buttonProps
}) => {
  return (
    <Link to={to} prefetch="intent" onClick={onClick}>
      <ButtonBase {...buttonProps} />
    </Link>
  );
};
