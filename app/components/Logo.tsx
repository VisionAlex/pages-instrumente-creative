import { Link } from "@remix-run/react";
import React from "react";
import { classNames } from "~/shared/utils/classNames";

const LOGO_SIZE = 78;

interface Props {
  className?: string;
  size?: number;
}

export const Logo: React.FC<Props> = ({ size = LOGO_SIZE, className }) => {
  return (
    <Link
      to="/"
      prefetch="intent"
      className={classNames(
        "order-2 cursor-pointer hover:opacity-70 lg:order-1",
        className
      )}
    >
      <img
        src="https://cdn.shopify.com/s/files/1/0598/9367/8278/files/logo_transparent_156x.png?v=1649422810"
        alt="logo"
        width={size}
        height={size}
      />
    </Link>
  );
};
