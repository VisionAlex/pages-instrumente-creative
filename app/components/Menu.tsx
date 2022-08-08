import { Link } from "./Link";
import { MenuIcon } from "./shared/icons";

export const Menu: React.FC = () => {
  return (
    <nav className="order-1 text-primary lg:order-2">
      <button className="hover:opacity-70 lg:hidden">
        <MenuIcon />
      </button>
      <div className="hidden flex-wrap items-stretch gap-[30px] lg:flex">
        <Link to="/products">Produse</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">Despre noi</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};
