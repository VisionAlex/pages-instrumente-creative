import { Outlet } from "@remix-run/react";
import React from "react";

const account: React.FC = () => {
  return (
    <div className="mx-auto mt-4 max-w-xl px-5 pt-2.5 sm:mt-8 md:mt-16">
      <Outlet />
    </div>
  );
};

export default account;
