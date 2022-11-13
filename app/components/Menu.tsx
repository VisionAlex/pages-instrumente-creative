import { NavLink } from "@remix-run/react";
import { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "./shared/Link";
import { MenuIcon } from "./shared/icons";
import { config } from "~/config";

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const menuPages = Object.values(config.pages).filter(
    (page) => page.type === "menu"
  );

  return (
    <nav className="z-50 order-1 text-primary lg:order-2">
      {isOpen ? (
        <button
          className="hover:opacity-70 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="close"
        >
          <IoCloseOutline fontSize={30} />
        </button>
      ) : (
        <button
          className="hover:opacity-70 lg:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="open"
        >
          <MenuIcon />
        </button>
      )}
      <div className="hidden flex-wrap items-stretch gap-[30px] lg:flex">
        {menuPages.map(({ name, path }) => (
          <Link key={name} to={path}>
            {name}
          </Link>
        ))}
      </div>
      <div
        className={`${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }  fixed top-[123px] left-0 z-50 h-[calc(100vh_-_123px_-_50px)] w-full overflow-y-auto overflow-x-hidden px-[20px] transition duration-300 lg:hidden`}
      >
        <div
          ref={mobileMenuRef}
          className={`flex min-h-[calc(100vh_-_123px_-_50px)] flex-col bg-secondaryBackground p-[30px] capitalize`}
        >
          {menuPages.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className="mb-[13px] border-b border-secondaryLine pb-[13px]"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
