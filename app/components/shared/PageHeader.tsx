import { useLocation } from "@remix-run/react";
import { config } from "~/config";
import { Breadcrumb } from "./Breadcrumb/Breadcrumb";

export const PageHeader: React.FC = () => {
  const path = useLocation().pathname;
  const name = Object.values(config.pages).find(
    (page) => page.path === path
  )?.name;
  if (!name) throw new Error("Page not found");
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-8 md:flex-row md:justify-between md:gap-0 lg:px-8 xl:px-20">
      <h1 className="text-title capitalize tracking-tighter text-primary lg:text-3xl">
        {name}
      </h1>
      <Breadcrumb name={name} />
    </div>
  );
};
