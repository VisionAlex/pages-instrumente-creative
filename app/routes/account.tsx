import { Outlet } from "@remix-run/react";
import React from "react";

const account: React.FC = () => {
  return (
    <div className="mx-auto mt-16 max-w-xl px-5 pt-2.5">
      <Outlet />
    </div>
  );
};

export default account;
