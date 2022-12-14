import { useLocation } from "@remix-run/react";
import { config } from "~/config";
import { classNames } from "~/shared/utils/classNames";
import { Breadcrumb } from "./Breadcrumb/Breadcrumb";

interface Props {
  className?: string;
  customTitle?: string;
}

export const PageHeader: React.FC<Props> = ({ className, customTitle }) => {
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
      <h1 className="text-center text-title capitalize tracking-tighter text-primary md:text-left md:text-4xl">
        {customTitle ?? name}
      </h1>
      <Breadcrumb name={name} />
    </div>
  );
};
