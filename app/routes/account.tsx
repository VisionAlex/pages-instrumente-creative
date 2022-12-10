import {
  ClipboardListIcon,
  LocationMarkerIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { NavLink, Outlet, useLocation } from "@remix-run/react";
import React from "react";
import { FadeIn } from "~/components/shared/FadeIn";
import { classNames } from "~/shared/utils/classNames";

const Account: React.FC = () => {
  const pathname = useLocation().pathname;
  const title = pathname === "/account/address" ? "Adrese" : "Contul meu";
  return (
    <FadeIn className="mx-auto mt-4 max-w-xl px-5 pt-2.5 sm:mt-8 md:mt-16">
      <h1 className="mb-10 mt-12 text-center text-3xl">{title}</h1>
      <nav className="items-center border border-line py-5">
        <NavLink to="/account" end>
          {({ isActive }) => (
            <div className="link-parent flex items-center gap-4 p-5">
              <ClipboardListIcon
                strokeWidth={1.5}
                className={classNames(
                  "link-child h-10 w-10 rounded-full border border-line p-2",
                  isActive ? "bg-primary text-white" : ""
                )}
              />
              <span>Istoric comenzi</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/account/address">
          {({ isActive }) => (
            <div className="link-parent flex items-center gap-4 p-5">
              <LocationMarkerIcon
                strokeWidth={1.5}
                className={classNames(
                  "link-child h-10 w-10 rounded-full border border-line p-2",
                  isActive ? "bg-primary text-white" : ""
                )}
              />
              <span>Adresă</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/auth/logout">
          {({ isActive }) => (
            <div className="link-parent flex items-center gap-4 p-5">
              <LogoutIcon
                strokeWidth={1.5}
                className={classNames(
                  "link-child h-10 w-10 rounded-full border border-line p-2 pl-3",
                  isActive ? "bg-primary text-white" : ""
                )}
              />
              <span>Deconectează-te</span>
            </div>
          )}
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </FadeIn>
  );
};

export default Account;
