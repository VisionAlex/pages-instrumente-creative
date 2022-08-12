import { Link } from "@remix-run/react";
import React from "react";

const LOGO_SIZE = 78;

export const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      prefetch="intent"
      className="order-2 cursor-pointer hover:opacity-70 lg:order-1"
    >
      <img
        src="https://cdn.shopify.com/s/files/1/0598/9367/8278/files/logo_transparent_156x.png?v=1649422810"
        alt="logo"
        width={LOGO_SIZE}
        height={LOGO_SIZE}
      />
    </Link>
  );
};
