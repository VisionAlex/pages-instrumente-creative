import { Link } from "./Link";

export const Menu: React.FC = () => {
  return (
    <ul className="flex flex-wrap items-stretch gap-[30px] text-primary">
      <Link to="/products">Produse</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/about">Despre noi</Link>
      <Link to="/contact">Contact</Link>
    </ul>
  );
};
