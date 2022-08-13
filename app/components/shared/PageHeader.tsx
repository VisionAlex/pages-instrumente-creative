import { useLocation } from "@remix-run/react";
import { Link } from "./Link";
import { MENU_ITEMS } from "../Menu";
import { Breadcrumb } from "./Breadcrumb";

export const PageHeader: React.FC = () => {
  const path = useLocation().pathname;
  const name = MENU_ITEMS.find((item) => item.link === path)?.name;
  return (
    <div className="mx-5 flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between md:gap-0 lg:mx-8 xl:mx-20">
      <h1 className="text-title capitalize tracking-tighter text-primary lg:text-3xl">
        {name}
      </h1>
      <Breadcrumb name={name} />
    </div>
  );
};
