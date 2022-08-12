import { NavLink } from "@remix-run/react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "./Link";
import { MenuIcon } from "./shared/icons";

export const MENU_ITEMS = [
  {
    name: "Produse",
    link: "/products",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Despre noi",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
] as const;

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        {MENU_ITEMS.map(({ name, link }) => (
          <Link key={name} to={link}>
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
          className={`flex min-h-[calc(100vh_-_123px_-_50px)] flex-col bg-secondaryBackground p-[30px] capitalize`}
        >
          {MENU_ITEMS.map(({ name, link }) => (
            <NavLink
              key={name}
              to={link}
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
