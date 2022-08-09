import { NavLink } from "@remix-run/react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "./Link";
import { MenuIcon } from "./shared/icons";

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="order-1 text-primary lg:order-2">
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
        <Link to="/products">Produse</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">Despre noi</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div
        className={`${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } fixed top-[123px] left-0 h-[calc(100vh_-_123px_-_50px)] w-full overflow-y-auto overflow-x-hidden px-[20px] transition duration-300 lg:hidden`}
      >
        <div
          className={`flex min-h-[calc(100vh_-_123px_-_50px)] flex-col bg-background p-[30px]`}
        >
          <NavLink className="mb-[13px] border-b pb-[13px]" to="/products">
            Produse
          </NavLink>
          <NavLink className="mb-[13px] border-b pb-[13px]" to="/blog">
            Blog
          </NavLink>
          <NavLink className="mb-[13px] border-b pb-[13px]" to="/about">
            Despre noi
          </NavLink>
          <NavLink className="mb-[13px] border-b pb-[13px]" to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
