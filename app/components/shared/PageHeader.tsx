import { useLocation } from "@remix-run/react";
import { Link } from "../Link";
import { MENU_ITEMS } from "../Menu";

export const PageHeader: React.FC = () => {
  const path = useLocation().pathname;
  const name = MENU_ITEMS.find((item) => item.link === path)?.name;
  return (
    <div className="mx-5 flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between md:gap-0">
      <h1 className="text-title tracking-tighter text-primary">{name}</h1>
      <div className="flex gap-1.5">
        <Link to="/">Acasa </Link>
        <span>/</span>
        <span>{name}</span>
      </div>
    </div>
  );
};
