import { Link } from "@remix-run/react";
import React from "react";
import { Button } from "./Button";

interface Props {
  to: string;
  text: string;
}

export const LinkAsButton: React.FC<Props> = ({ to, text }) => {
  return (
    <Link to={to} prefetch="intent">
      <Button text={text} />
    </Link>
  );
};
