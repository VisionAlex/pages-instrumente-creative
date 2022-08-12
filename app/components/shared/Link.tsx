import { NavLink } from "@remix-run/react";
import React from "react";

interface Props {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<Props> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      prefetch="intent"
      className="relative flex h-full cursor-pointer items-center after:absolute after:left-auto after:right-0 after:bottom-0 after:inline-block after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:left-0 hover:after:w-full"
    >
      {children}
    </NavLink>
  );
};
