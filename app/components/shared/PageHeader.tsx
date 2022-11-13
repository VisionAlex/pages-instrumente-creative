import { useLocation } from "@remix-run/react";
import { config } from "~/config";
import { classNames } from "~/shared/utils/classNames";
import { Breadcrumb } from "./Breadcrumb/Breadcrumb";

interface Props {
  className?: string;
}

export const PageHeader: React.FC<Props> = ({ className }) => {
  const path = useLocation().pathname;
  const name = Object.values(config.pages).find(
    (page) => page.path === path
  )?.name;
  if (!name) throw new Error("Page not found");
  return (
    <div
      className={classNames(
        "mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-8 md:flex-row md:justify-between md:gap-0 lg:px-8 xl:px-20",
        className
      )}
    >
      <h1 className="text-title capitalize tracking-tighter text-primary lg:text-3xl">
        {name}
      </h1>
      <Breadcrumb name={name} />
    </div>
  );
};
